#!/usr/bin/env python3
"""Chrome native-messaging host — starts/stops lock_daemon.py (stays alive after Chrome disconnects)."""
import json
import os
import struct
import subprocess
import sys
import time

def app_dir():
    if getattr(sys, "frozen", False):
        return os.path.dirname(os.path.abspath(sys.executable))
    return os.path.dirname(os.path.abspath(__file__))


DIR = app_dir()
CSHARP_HOST = os.path.join(DIR, "StudyFlowLockHost.exe")
DAEMON_EXE = os.path.join(DIR, "studyflow-lock-daemon.exe")
DAEMON_SCRIPT = os.path.join(DIR, "lock_daemon.py")
DAEMON_PS1 = os.path.join(DIR, "lock-daemon.ps1")
SHIELD_FLAG = os.path.join(os.environ.get("TEMP", "."), "studyflow-shield.on")


def powershell_exe():
    sysroot = os.environ.get("SystemRoot", r"C:\Windows")
    for rel in (
        r"System32\WindowsPowerShell\v1.0\powershell.exe",
        r"SysWOW64\WindowsPowerShell\v1.0\powershell.exe",
    ):
        path = os.path.join(sysroot, rel)
        if os.path.isfile(path):
            return path
    return "powershell.exe"


def daemon_launch_cmd():
    if os.path.isfile(DAEMON_PS1):
        return [
            powershell_exe(),
            "-NoProfile",
            "-ExecutionPolicy",
            "Bypass",
            "-WindowStyle",
            "Hidden",
            "-File",
            DAEMON_PS1,
        ]
    if os.path.isfile(DAEMON_EXE):
        return [DAEMON_EXE]
    if os.path.isfile(DAEMON_SCRIPT):
        return [sys.executable, DAEMON_SCRIPT]
    return None
PID_FILE = os.path.join(os.environ.get("TEMP", "."), "studyflow-lock.pid")
UNLOCK_FLAG = os.path.join(os.environ.get("TEMP", "."), "studyflow-lock.unlock")
LOG_PATH = os.path.join(os.environ.get("TEMP", "."), "studyflow-lock.log")

CREATE_NO_WINDOW = 0x08000000
DETACHED_PROCESS = 0x00000008


def log(msg):
    try:
        with open(LOG_PATH, "a", encoding="utf-8") as f:
            f.write(msg + "\n")
    except OSError:
        pass


def read_message():
    raw = sys.stdin.buffer.read(4)
    if len(raw) < 4:
        return None
    length = struct.unpack("@I", raw)[0]
    if length <= 0:
        return None
    data = sys.stdin.buffer.read(length)
    return json.loads(data.decode("utf-8"))


def write_message(obj):
    payload = json.dumps(obj).encode("utf-8")
    sys.stdout.buffer.write(struct.pack("@I", len(payload)))
    sys.stdout.buffer.write(payload)
    sys.stdout.buffer.flush()


def is_process_alive(pid):
    if sys.platform != "win32":
        return False
    try:
        r = subprocess.run(
            ["tasklist", "/FI", f"PID eq {pid}", "/NH"],
            creationflags=CREATE_NO_WINDOW,
            capture_output=True,
            timeout=4,
            text=True,
        )
        return str(pid) in (r.stdout or "")
    except Exception:
        return False


def signal_unlock():
    try:
        with open(UNLOCK_FLAG, "w", encoding="utf-8") as f:
            f.write("1")
    except OSError as e:
        log("signal_unlock: " + str(e))


def kill_daemon_processes():
    """Stop lock daemons only — never kill studyflow-lock-host.exe (that is this process)."""
    if sys.platform != "win32":
        return
    for args in (
        ["taskkill", "/IM", "StudyFlowLockHost.exe", "/F", "/T"],
        ["taskkill", "/IM", "studyflow-lock-daemon.exe", "/F", "/T"],
    ):
        try:
            subprocess.run(
                args,
                creationflags=CREATE_NO_WINDOW,
                capture_output=True,
                timeout=8,
            )
        except Exception as e:
            log("kill_all " + " ".join(args) + ": " + str(e))
    try:
        ps = (
            "Get-CimInstance Win32_Process | Where-Object { "
            "$_.Name -eq 'python.exe' -and $_.CommandLine -like '*lock_daemon*' "
            "} | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
        )
        subprocess.run(
            ["powershell", "-NoProfile", "-Command", ps],
            creationflags=CREATE_NO_WINDOW,
            capture_output=True,
            timeout=12,
        )
    except Exception as e:
        log("kill python daemons: " + str(e))
    try:
        if os.path.isfile(SHIELD_FLAG):
            os.remove(SHIELD_FLAG)
    except OSError:
        pass
    for path in (PID_FILE, UNLOCK_FLAG):
        try:
            if os.path.isfile(path):
                os.remove(path)
        except OSError:
            pass


def kill_all_lock_daemons():
    """Emergency stop — used by unlock-now.bat, not from the live host process."""
    kill_daemon_processes()
    if sys.platform != "win32":
        return
    try:
        subprocess.run(
            ["taskkill", "/IM", "studyflow-lock-host.exe", "/F", "/T"],
            creationflags=CREATE_NO_WINDOW,
            capture_output=True,
            timeout=8,
        )
    except Exception as e:
        log("kill host exe: " + str(e))


def lock_off():
    signal_unlock()
    time.sleep(0.35)
    kill_daemon_processes()

    if not os.path.isfile(PID_FILE):
        return True, "unlocked"

    try:
        with open(PID_FILE, "r", encoding="utf-8") as f:
            pid = int(f.read().strip())
    except (ValueError, OSError):
        try:
            os.remove(PID_FILE)
        except OSError:
            pass
        return True, "cleared_stale_pid"

    try:
        subprocess.run(
            ["taskkill", "/PID", str(pid), "/F", "/T"],
            creationflags=CREATE_NO_WINDOW,
            capture_output=True,
            timeout=8,
        )
    except Exception as e:
        log("taskkill pid failed: " + str(e))

    try:
        os.remove(PID_FILE)
    except OSError:
        pass

    log("lock_off pid=" + str(pid))
    return True, "unlocked"


def spawn_csharp_hook():
    """Detached --hook child survives after Chrome closes native messaging."""
    if not os.path.isfile(CSHARP_HOST):
        return False, "missing_StudyFlowLockHost.exe"
    try:
        if os.path.isfile(UNLOCK_FLAG):
            os.remove(UNLOCK_FLAG)
    except OSError:
        pass
    flags = DETACHED_PROCESS | CREATE_NO_WINDOW
    proc = subprocess.Popen(
        [CSHARP_HOST, "--hook"],
        cwd=DIR,
        creationflags=flags,
        close_fds=True,
    )
    time.sleep(0.65)
    if proc.poll() is not None:
        log("csharp --hook exited code=" + str(proc.returncode))
        return False, "csharp_hook_failed"
    try:
        with open(SHIELD_FLAG, "w", encoding="utf-8") as f:
            f.write("1")
    except OSError:
        pass
    with open(PID_FILE, "w", encoding="utf-8") as f:
        f.write(str(proc.pid))
    if not is_process_alive(proc.pid):
        return False, "csharp_hook_not_running"
    log("lock_on csharp --hook pid=" + str(proc.pid))
    return True, "locked_pid_" + str(proc.pid)


def lock_on():
    signal_unlock()
    kill_daemon_processes()
    time.sleep(0.2)
    try:
        if os.path.isfile(PID_FILE):
            os.remove(PID_FILE)
    except OSError:
        pass

    if os.path.isfile(CSHARP_HOST):
        return spawn_csharp_hook()

    cmd = daemon_launch_cmd()
    if not cmd:
        return False, "missing StudyFlowLockHost.exe or lock daemon"

    flags = DETACHED_PROCESS | CREATE_NO_WINDOW
    proc = subprocess.Popen(
        cmd,
        cwd=DIR,
        creationflags=flags,
        close_fds=True,
    )

    time.sleep(0.55)

    if proc.poll() is not None:
        log("daemon exited early code=" + str(proc.returncode))
        tail = ""
        try:
            if os.path.isfile(LOG_PATH):
                with open(LOG_PATH, "r", encoding="utf-8") as f:
                    tail = f.read()[-400:]
        except OSError:
            pass
        return False, "daemon_failed: " + tail.replace("\n", " ")

    with open(PID_FILE, "w", encoding="utf-8") as f:
        f.write(str(proc.pid))

    if not is_process_alive(proc.pid):
        log("lock_on daemon not alive pid=" + str(proc.pid))
        return False, "daemon_not_running"

    log("lock_on pid=" + str(proc.pid))
    return True, "locked_pid_" + str(proc.pid)


def main():
    while True:
        msg = read_message()
        if msg is None:
            break
        cmd = (msg.get("cmd") or "").upper()
        if cmd == "PING":
            alive = False
            if os.path.isfile(PID_FILE):
                try:
                    with open(PID_FILE, "r", encoding="utf-8") as f:
                        alive = is_process_alive(int(f.read().strip()))
                except (ValueError, OSError):
                    alive = False
            write_message({"ok": True, "pong": True, "locked": alive})
        elif cmd == "LOCK_ON":
            ok, detail = lock_on()
            write_message({"ok": ok, "detail": detail, "locked": ok})
        elif cmd == "LOCK_OFF":
            ok, detail = lock_off()
            write_message({"ok": ok, "detail": detail, "locked": False})
        else:
            write_message({"ok": False, "error": "unknown_cmd"})


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        log("host crash: " + str(e))
        raise
