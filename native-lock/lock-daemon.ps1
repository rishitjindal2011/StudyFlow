# StudyFlow PC lock — Windows low-level keyboard hook (no Python required)
$ErrorActionPreference = 'Stop'
$logPath = Join-Path $env:TEMP 'studyflow-lock.log'
$unlockFlag = Join-Path $env:TEMP 'studyflow-lock.unlock'
$pidFile = Join-Path $env:TEMP 'studyflow-lock.pid'

function Write-Log($msg) {
  try { Add-Content -Path $logPath -Value $msg -Encoding UTF8 } catch {}
}

Write-Log "ps1 daemon starting pid=$PID"

if (Test-Path $unlockFlag) { Remove-Item $unlockFlag -Force -ErrorAction SilentlyContinue }
Set-Content -Path $pidFile -Value $PID -Encoding ASCII -NoNewline

Add-Type -ReferencedAssemblies System.Windows.Forms @"
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;

public static class StudyFlowKeyLock {
    private const int WH_KEYBOARD_LL = 13;
    private const int WM_KEYDOWN = 0x0100;
    private const int WM_KEYUP = 0x0101;
    private const int WM_SYSKEYDOWN = 0x0104;
    private const int WM_SYSKEYUP = 0x0105;
    private const int WM_QUIT = 0x0012;

    private const int VK_TAB = 0x09;
    private const int VK_ESCAPE = 0x1B;
    private const int VK_MENU = 0x12;
    private const int VK_LWIN = 0x5B;
    private const int VK_RWIN = 0x5C;
    private const int VK_APPS = 0x5D;
    private const int VK_LMENU = 0xA4;
    private const int VK_RMENU = 0xA5;
    private const int VK_CONTROL = 0x11;
    private const int VK_LCONTROL = 0xA2;
    private const int VK_RCONTROL = 0xA3;
    private const int VK_D = 0x44;
    private const int VK_M = 0x4D;

    private static HashSet<int> pressed = new HashSet<int>();
    private static IntPtr hookId = IntPtr.Zero;
    private static LowLevelKeyboardProc proc = HookCallback;
    private static string unlockPath;
    private static uint mainThreadId;

    private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

    [StructLayout(LayoutKind.Sequential)]
    private struct KBDLLHOOKSTRUCT {
        public uint vkCode;
        public uint scanCode;
        public uint flags;
        public uint time;
        public UIntPtr dwExtraInfo;
    }

    [DllImport("user32.dll", SetLastError = true)]
    private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);

    [DllImport("user32.dll", SetLastError = true)]
    private static extern bool UnhookWindowsHookEx(IntPtr hhk);

    [DllImport("user32.dll")]
    private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

    [DllImport("user32.dll")]
    private static extern short GetAsyncKeyState(int vKey);

    [DllImport("user32.dll")]
    private static extern bool PostThreadMessage(uint threadId, uint msg, IntPtr wParam, IntPtr lParam);

    [DllImport("kernel32.dll")]
    private static extern uint GetCurrentThreadId();

    private static bool AltDown() {
        if (pressed.Contains(VK_MENU) || pressed.Contains(VK_LMENU) || pressed.Contains(VK_RMENU)) return true;
        return (GetAsyncKeyState(VK_MENU) & 0x8000) != 0
            || (GetAsyncKeyState(VK_LMENU) & 0x8000) != 0
            || (GetAsyncKeyState(VK_RMENU) & 0x8000) != 0;
    }

    private static bool WinDown() {
        if (pressed.Contains(VK_LWIN) || pressed.Contains(VK_RWIN) || pressed.Contains(VK_APPS)) return true;
        return (GetAsyncKeyState(VK_LWIN) & 0x8000) != 0
            || (GetAsyncKeyState(VK_RWIN) & 0x8000) != 0
            || (GetAsyncKeyState(VK_APPS) & 0x8000) != 0;
    }

    private static bool CtrlDown() {
        return (GetAsyncKeyState(VK_CONTROL) & 0x8000) != 0
            || (GetAsyncKeyState(VK_LCONTROL) & 0x8000) != 0
            || (GetAsyncKeyState(VK_RCONTROL) & 0x8000) != 0;
    }

    private static bool ShouldBlock(int vk, int wParam) {
        if (wParam == WM_KEYUP || wParam == WM_SYSKEYUP) {
            pressed.Remove(vk);
            return false;
        }
        if (wParam != WM_KEYDOWN && wParam != WM_SYSKEYDOWN) return false;

        pressed.Add(vk);

        if (vk == VK_LWIN || vk == VK_RWIN || vk == VK_APPS) return true;
        if (vk == VK_MENU || vk == VK_LMENU || vk == VK_RMENU) return true;
        if (vk == VK_TAB && (AltDown() || WinDown())) return true;
        if (vk == VK_ESCAPE && AltDown()) return true;
        if ((vk == VK_D || vk == VK_M || vk == VK_TAB) && WinDown()) return true;
        if (vk == VK_TAB && CtrlDown() && WinDown()) return true;
        return false;
    }

    private static IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam) {
        if (File.Exists(unlockPath)) {
            PostThreadMessage(mainThreadId, WM_QUIT, IntPtr.Zero, IntPtr.Zero);
            return CallNextHookEx(hookId, nCode, wParam, lParam);
        }
        if (nCode >= 0) {
            KBDLLHOOKSTRUCT kb = Marshal.PtrToStructure<KBDLLHOOKSTRUCT>(lParam);
            int wp = wParam.ToInt32();
            if (ShouldBlock((int)kb.vkCode, wp)) return (IntPtr)1;
        }
        return CallNextHookEx(hookId, nCode, wParam, lParam);
    }

    public static void Run(string unlockFlagPath) {
        unlockPath = unlockFlagPath;
        hookId = SetWindowsHookEx(WH_KEYBOARD_LL, proc, IntPtr.Zero, 0);
        if (hookId == IntPtr.Zero) {
            throw new InvalidOperationException("SetWindowsHookEx failed: " + Marshal.GetLastWin32Error());
        }
        mainThreadId = GetCurrentThreadId();
        Application.Run();
        UnhookWindowsHookEx(hookId);
        hookId = IntPtr.Zero;
    }
}
"@

try {
  Write-Log 'ps1 hook starting'
  [StudyFlowKeyLock]::Run($unlockFlag)
  Write-Log 'ps1 daemon exiting cleanly'
} catch {
  Write-Log ('ps1 ERROR: ' + $_.Exception.Message)
  exit 1
} finally {
  if (Test-Path $pidFile) { Remove-Item $pidFile -Force -ErrorAction SilentlyContinue }
  if (Test-Path $unlockFlag) { Remove-Item $unlockFlag -Force -ErrorAction SilentlyContinue }
}
