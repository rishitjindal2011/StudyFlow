#!/usr/bin/env python3
"""StudyFlow Lock installer — builds StudyFlowLockHost.exe and registers Chrome native messaging."""
import json
import os
import re
import shutil
import subprocess
import sys

APP_NAME = "StudyFlow"
PRODUCT = "StudyFlow Lock"
CSHARP_HOST = "StudyFlowLockHost.exe"
CSHARP_SRC = "StudyFlowLockHost.cs"
NATIVE_NAME = "com.studyflow.lock"
MANIFEST_NAME = "com.studyflow.lock.installed.json"
ID_FILENAME = "studyflow-lock.id"


def bundle_dir():
    if getattr(sys, "frozen", False):
        return sys._MEIPASS
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist-bundle")


def script_dir():
    if getattr(sys, "frozen", False):
        return os.path.dirname(os.path.abspath(sys.executable))
    return os.path.dirname(os.path.abspath(__file__))


def dest_dir():
    return os.path.join(os.environ.get("LOCALAPPDATA", ""), APP_NAME, "pc-lock")


def valid_ext_id(s):
    return bool(s and re.fullmatch(r"[a-p]{32}", s.strip().lower()))


def read_id_file(path):
    try:
        with open(path, encoding="utf-8") as f:
            return f.read().strip().lower()
    except OSError:
        return None


def id_file_candidates():
    paths = []
    if getattr(sys, "frozen", False):
        paths.append(os.path.join(os.path.dirname(sys.executable), ID_FILENAME))
    paths.append(os.path.join(script_dir(), ID_FILENAME))
    home = os.environ.get("USERPROFILE", "")
    if home:
        paths.append(os.path.join(home, "Downloads", ID_FILENAME))
    return paths


def read_clipboard_id():
    try:
        import tkinter as tk

        root = tk.Tk()
        root.withdraw()
        raw = (root.clipboard_get() or "").strip().lower()
        root.destroy()
        if valid_ext_id(raw):
            return raw
    except Exception:
        pass
    return None


def find_extension_id():
    if len(sys.argv) >= 2 and valid_ext_id(sys.argv[1]):
        return sys.argv[1].strip().lower()

    for path in id_file_candidates():
        raw = read_id_file(path)
        if valid_ext_id(raw):
            return raw

    clip = read_clipboard_id()
    if clip:
        return clip

    return ask_extension_id_manual()


def ask_extension_id_manual():
    try:
        import tkinter as tk
        from tkinter import simpledialog

        root = tk.Tk()
        root.withdraw()
        eid = simpledialog.askstring(
            PRODUCT,
            "Paste StudyFlow Extension ID (from Block tab):",
            parent=root,
        )
        root.destroy()
        if eid and valid_ext_id(eid):
            return eid.strip().lower()
    except Exception:
        pass
    print(f"\n{PRODUCT} setup\n")
    eid = input("Paste Extension ID: ").strip().lower()
    if valid_ext_id(eid):
        return eid
    return None


def find_csc():
    windir = os.environ.get("SystemRoot", r"C:\Windows")
    for rel in (
        r"Microsoft.NET\Framework64\v4.0.30319\csc.exe",
        r"Microsoft.NET\Framework\v4.0.30319\csc.exe",
    ):
        path = os.path.join(windir, rel)
        if os.path.isfile(path):
            return path
    return None


def locate_csharp_sources():
    names = (CSHARP_SRC, CSHARP_HOST)
    for base in (bundle_dir(), script_dir()):
        for name in names:
            path = os.path.join(base, name)
            if os.path.isfile(path):
                if name.endswith(".cs"):
                    return path
                if name.endswith(".exe"):
                    return path
    return None


def ensure_csharp_host(target):
    """Install StudyFlowLockHost.exe — copy prebuilt or compile from .cs at install time."""
    out_exe = os.path.join(target, CSHARP_HOST)
    os.makedirs(target, exist_ok=True)

    for base in (bundle_dir(), script_dir()):
        bundled_exe = os.path.join(base, CSHARP_HOST)
        if os.path.isfile(bundled_exe):
            shutil.copy2(bundled_exe, out_exe)
            return out_exe

    src_path = None
    for base in (bundle_dir(), script_dir()):
        p = os.path.join(base, CSHARP_SRC)
        if os.path.isfile(p):
            src_path = p
            shutil.copy2(p, os.path.join(target, CSHARP_SRC))
            break

    if not src_path:
        raise FileNotFoundError(
            f"Missing {CSHARP_HOST} or {CSHARP_SRC} in installer bundle. Rebuild with build-exe.ps1."
        )

    csc = find_csc()
    if not csc:
        raise RuntimeError(
            ".NET Framework compiler (csc.exe) not found. Install .NET Framework 4.x from Microsoft."
        )

    refs = [
        "/reference:System.dll",
        "/reference:System.Windows.Forms.dll",
        "/reference:System.Drawing.dll",
    ]
    cmd = [csc, "/nologo", "/target:winexe", "/optimize+", f"/out:{out_exe}"] + refs + [src_path]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        err = (r.stderr or r.stdout or "compile failed").strip()
        raise RuntimeError("Could not build StudyFlowLockHost.exe: " + err)

    if not os.path.isfile(out_exe):
        raise RuntimeError("StudyFlowLockHost.exe was not created after compile.")

    return out_exe


def copy_helpers(target):
    for name in ("unlock-now.bat", "Uninstall-StudyFlow-Lock.bat", "Uninstall-StudyFlow-Lock.ps1"):
        for base in (bundle_dir(), script_dir()):
            src = os.path.join(base, name)
            if os.path.isfile(src):
                shutil.copy2(src, os.path.join(target, name))
                break


def write_manifest(target, ext_id, host_path):
    manifest = {
        "name": NATIVE_NAME,
        "description": "StudyFlow PC lock — blocks Alt+Tab during focus",
        "path": host_path,
        "type": "stdio",
        "allowed_origins": [f"chrome-extension://{ext_id}/"],
    }
    out = os.path.join(target, MANIFEST_NAME)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    return out


def register_native_host(manifest_path):
    if sys.platform != "win32":
        return
    import winreg

    key_path = rf"Software\Google\Chrome\NativeMessagingHosts\{NATIVE_NAME}"
    with winreg.CreateKey(winreg.HKEY_CURRENT_USER, key_path) as key:
        winreg.SetValueEx(key, "", 0, winreg.REG_SZ, manifest_path)


def install_watcher_task(host_exe, work_dir):
    if sys.platform != "win32":
        return
    try:
        ps = (
            "$tn='StudyFlowLockWatcher';"
            "Unregister-ScheduledTask -TaskName $tn -Confirm:$false -ErrorAction SilentlyContinue;"
            f"$a=New-ScheduledTaskAction -Execute '{host_exe}' -Argument '--watch' -WorkingDirectory '{work_dir}';"
            "$tr=New-ScheduledTaskTrigger -AtLogOn;"
            "$s=New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries;"
            "Register-ScheduledTask -TaskName $tn -Action $a -Trigger $tr -Settings $s -Force"
        )
        subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", ps],
            capture_output=True,
            timeout=30,
        )
    except Exception:
        pass


def main():
    ext_id = find_extension_id()
    if not ext_id:
        print("Invalid or missing Extension ID.")
        if getattr(sys, "frozen", False):
            input("Press Enter to exit...")
        sys.exit(1)

    target = dest_dir()
    try:
        host_exe = ensure_csharp_host(target)
        copy_helpers(target)
        manifest_path = write_manifest(target, ext_id, host_exe)
        register_native_host(manifest_path)
        install_watcher_task(host_exe, target)
    except Exception as e:
        print("Install failed:", e)
        if getattr(sys, "frozen", False):
            input("Press Enter to exit...")
        sys.exit(1)

    msg = (
        f"{PRODUCT} is ready.\n\n"
        f"Host: {host_exe}\n\n"
        "1. Reload StudyFlow at chrome://extensions\n"
        "2. Block tab → Check connection\n"
        "3. Start a focus session → Alt+Tab is blocked"
    )
    print(msg)
    try:
        import tkinter as tk
        from tkinter import messagebox

        root = tk.Tk()
        root.withdraw()
        messagebox.showinfo(PRODUCT + " — installed", msg)
        root.destroy()
    except Exception:
        pass

    if getattr(sys, "frozen", False):
        input("Press Enter to close...")


if __name__ == "__main__":
    main()
