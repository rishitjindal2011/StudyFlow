#!/usr/bin/env python3
"""Background process — blocks Alt+Tab / Win keys during StudyFlow focus (Windows hook)."""
import os
import sys
import threading
import time

LOG_PATH = os.path.join(os.environ.get("TEMP", "."), "studyflow-lock.log")
UNLOCK_FLAG = os.path.join(os.environ.get("TEMP", "."), "studyflow-lock.unlock")
PID_FILE = os.path.join(os.environ.get("TEMP", "."), "studyflow-lock.pid")

VK_TAB = 0x09
VK_ESCAPE = 0x1B
VK_MENU = 0x12
VK_LWIN = 0x5B
VK_RWIN = 0x5C
VK_APPS = 0x5D
VK_LMENU = 0xA4
VK_RMENU = 0xA5
VK_LCONTROL = 0xA2
VK_RCONTROL = 0xA3
VK_CONTROL = 0x11
VK_D = 0x44
VK_M = 0x4D

ALT_VKS = frozenset({VK_MENU, VK_LMENU, VK_RMENU})
WIN_VKS = frozenset({VK_LWIN, VK_RWIN, VK_APPS})
_pressed = set()
_hook_handle = None
_hook_proc_ref = None
_main_thread_id = 0


def log(msg):
    try:
        with open(LOG_PATH, "a", encoding="utf-8") as f:
            f.write(msg + "\n")
    except OSError:
        pass


def cleanup_files():
    for path in (UNLOCK_FLAG, PID_FILE):
        try:
            if os.path.isfile(path):
                os.remove(path)
        except OSError:
            pass


def cleanup_and_exit():
    global _hook_handle
    if sys.platform == "win32":
        try:
            import ctypes

            if _hook_handle:
                ctypes.windll.user32.UnhookWindowsHookEx(_hook_handle)
                _hook_handle = None
        except Exception as e:
            log("unhook: " + str(e))
    _pressed.clear()
    cleanup_files()
    log("daemon exiting cleanly")
    os._exit(0)


def unlock_watcher():
    while True:
        if os.path.isfile(UNLOCK_FLAG):
            log("unlock flag detected")
            if sys.platform == "win32" and _main_thread_id:
                try:
                    import ctypes

                    WM_QUIT = 0x0012
                    ctypes.windll.user32.PostThreadMessageW(_main_thread_id, WM_QUIT, 0, 0)
                except Exception as e:
                    log("PostThreadMessage: " + str(e))
                    cleanup_and_exit()
            else:
                cleanup_and_exit()
            return
        time.sleep(0.12)


def _alt_down(user32):
    if _pressed & ALT_VKS:
        return True
    for vk in ALT_VKS:
        if user32.GetAsyncKeyState(vk) & 0x8000:
            return True
    return False


def _win_down(user32):
    if _pressed & WIN_VKS:
        return True
    for vk in WIN_VKS:
        if user32.GetAsyncKeyState(vk) & 0x8000:
            return True
    return False


def _ctrl_down(user32):
    if user32.GetAsyncKeyState(VK_CONTROL) & 0x8000:
        return True
    if user32.GetAsyncKeyState(VK_LCONTROL) & 0x8000:
        return True
    if user32.GetAsyncKeyState(VK_RCONTROL) & 0x8000:
        return True
    return False


def _should_block(vk, wparam, user32):
    global _pressed
    WM_KEYDOWN = 0x0100
    WM_KEYUP = 0x0101
    WM_SYSKEYDOWN = 0x0104
    WM_SYSKEYUP = 0x0105

    if wparam in (WM_KEYUP, WM_SYSKEYUP):
        _pressed.discard(vk)
        return False

    if wparam not in (WM_KEYDOWN, WM_SYSKEYDOWN):
        return False

    _pressed.add(vk)

    if vk in WIN_VKS:
        return True

    if vk in ALT_VKS:
        return True

    if vk == VK_TAB and (_alt_down(user32) or _win_down(user32)):
        return True

    if vk == VK_ESCAPE and _alt_down(user32):
        return True

    if vk in (VK_D, VK_M, VK_TAB) and _win_down(user32):
        return True

    if vk == VK_TAB and _ctrl_down(user32) and _win_down(user32):
        return True

    return False


def run_win32_hook():
    global _hook_handle, _hook_proc_ref, _main_thread_id

    import ctypes
    from ctypes import wintypes

    user32 = ctypes.WinDLL("user32", use_last_error=True)
    kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)

    class KBDLLHOOKSTRUCT(ctypes.Structure):
        _fields_ = [
            ("vkCode", wintypes.DWORD),
            ("scanCode", wintypes.DWORD),
            ("flags", wintypes.DWORD),
            ("time", wintypes.DWORD),
            ("dwExtraInfo", ctypes.c_ulonglong),
        ]

    WH_KEYBOARD_LL = 13
    WM_QUIT = 0x0012

    LowLevelProc = ctypes.WINFUNCTYPE(
        ctypes.c_long,
        ctypes.c_int,
        wintypes.WPARAM,
        wintypes.LPARAM,
    )

    @LowLevelProc
    def hook_proc(nCode, wParam, lParam):
        if nCode >= 0:
            kb = ctypes.cast(lParam, ctypes.POINTER(KBDLLHOOKSTRUCT)).contents
            if _should_block(kb.vkCode, wParam, user32):
                return 1
        return user32.CallNextHookEx(_hook_handle, nCode, wParam, lParam)

    _hook_proc_ref = hook_proc
    _hook_handle = user32.SetWindowsHookExW(WH_KEYBOARD_LL, hook_proc, None, 0)
    if not _hook_handle:
        err = kernel32.GetLastError()
        log("SetWindowsHookEx failed err=" + str(err))
        return False

    _main_thread_id = kernel32.GetCurrentThreadId()
    log("win32 keyboard hook active tid=" + str(_main_thread_id))

    msg = wintypes.MSG()
    while True:
        if os.path.isfile(UNLOCK_FLAG):
            break
        ret = user32.GetMessageW(ctypes.byref(msg), None, 0, 0)
        if ret == 0 or ret == -1:
            break
        user32.TranslateMessage(ctypes.byref(msg))
        user32.DispatchMessageW(ctypes.byref(msg))

    try:
        user32.UnhookWindowsHookEx(_hook_handle)
    except Exception:
        pass
    _hook_handle = None
    return True


def main():
    log("daemon starting pid=" + str(os.getpid()) + " platform=" + sys.platform)

    try:
        with open(PID_FILE, "w", encoding="utf-8") as f:
            f.write(str(os.getpid()))
    except OSError:
        pass

    try:
        if os.path.isfile(UNLOCK_FLAG):
            os.remove(UNLOCK_FLAG)
    except OSError:
        pass

    threading.Thread(target=unlock_watcher, daemon=True).start()

    if sys.platform == "win32":
        try:
            if run_win32_hook():
                cleanup_and_exit()
                return
        except Exception as e:
            log("win32 hook crash: " + str(e))

    log("ERROR: Windows keyboard hook failed — reinstall PC Lock or run unlock-now.bat")
    sys.exit(1)


if __name__ == "__main__":
    main()
