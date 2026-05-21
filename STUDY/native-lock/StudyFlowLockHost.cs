// Chrome native messaging host — spawns detached hook process (survives Chrome disconnect)
using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace StudyFlowLock
{
    internal static class NativeIo
    {
        public static string ReadMessage()
        {
            var stdin = Console.OpenStandardInput();
            var lenBuf = new byte[4];
            if (stdin.Read(lenBuf, 0, 4) < 4) return null;
            int len = BitConverter.ToInt32(lenBuf, 0);
            if (len <= 0 || len > 1000000) return null;
            var data = new byte[len];
            int off = 0;
            while (off < len)
            {
                int n = stdin.Read(data, off, len - off);
                if (n <= 0) return null;
                off += n;
            }
            return Encoding.UTF8.GetString(data);
        }

        public static void WriteMessage(string json)
        {
            var bytes = Encoding.UTF8.GetBytes(json);
            var len = BitConverter.GetBytes((uint)bytes.Length);
            var stdout = Console.OpenStandardOutput();
            stdout.Write(len, 0, 4);
            stdout.Write(bytes, 0, bytes.Length);
            stdout.Flush();
        }
    }

    internal static class KeyLock
    {
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

        private static Thread hookThread;
        private static uint hookThreadId;
        private static volatile bool hookActive;
        private static IntPtr hookId = IntPtr.Zero;
        private static LowLevelKeyboardProc hookProc;
        private static readonly System.Collections.Generic.HashSet<int> Pressed =
            new System.Collections.Generic.HashSet<int>();

        private static string LogPath;
        private static string UnlockPath;

        private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

        [StructLayout(LayoutKind.Sequential)]
        private struct KBDLLHOOKSTRUCT
        {
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
        private static extern bool PostThreadMessage(uint id, uint msg, IntPtr wParam, IntPtr lParam);

        [DllImport("kernel32.dll")]
        private static extern uint GetCurrentThreadId();

        private static void Log(string msg)
        {
            try { File.AppendAllText(LogPath, DateTime.Now.ToString("o") + " " + msg + Environment.NewLine, Encoding.UTF8); } catch { }
        }

        private static bool AltDown()
        {
            if (Pressed.Contains(VK_MENU) || Pressed.Contains(VK_LMENU) || Pressed.Contains(VK_RMENU)) return true;
            return (GetAsyncKeyState(VK_MENU) & 0x8000) != 0
                || (GetAsyncKeyState(VK_LMENU) & 0x8000) != 0
                || (GetAsyncKeyState(VK_RMENU) & 0x8000) != 0;
        }

        private static bool WinDown()
        {
            if (Pressed.Contains(VK_LWIN) || Pressed.Contains(VK_RWIN) || Pressed.Contains(VK_APPS)) return true;
            return (GetAsyncKeyState(VK_LWIN) & 0x8000) != 0
                || (GetAsyncKeyState(VK_RWIN) & 0x8000) != 0
                || (GetAsyncKeyState(VK_APPS) & 0x8000) != 0;
        }

        private static bool CtrlDown()
        {
            return (GetAsyncKeyState(VK_CONTROL) & 0x8000) != 0
                || (GetAsyncKeyState(VK_LCONTROL) & 0x8000) != 0
                || (GetAsyncKeyState(VK_RCONTROL) & 0x8000) != 0;
        }

        private static bool ShouldBlock(int vk, int wParam)
        {
            if (wParam == WM_KEYUP || wParam == WM_SYSKEYUP)
            {
                Pressed.Remove(vk);
                return false;
            }
            if (wParam != WM_KEYDOWN && wParam != WM_SYSKEYDOWN) return false;
            Pressed.Add(vk);
            if (vk == VK_LWIN || vk == VK_RWIN || vk == VK_APPS) return true;
            if (vk == VK_MENU || vk == VK_LMENU || vk == VK_RMENU) return true;
            if (vk == VK_TAB && (AltDown() || WinDown())) return true;
            if (vk == VK_ESCAPE && AltDown()) return true;
            if ((vk == VK_D || vk == VK_M || vk == VK_TAB) && WinDown()) return true;
            if (vk == VK_TAB && CtrlDown() && WinDown()) return true;
            return false;
        }

        private static IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
        {
            if (File.Exists(UnlockPath))
            {
                PostThreadMessage(hookThreadId, WM_QUIT, IntPtr.Zero, IntPtr.Zero);
                return CallNextHookEx(hookId, nCode, wParam, lParam);
            }
            if (nCode >= 0)
            {
                var kb = Marshal.PtrToStructure<KBDLLHOOKSTRUCT>(lParam);
                if (ShouldBlock((int)kb.vkCode, wParam.ToInt32()))
                    return (IntPtr)1;
            }
            return CallNextHookEx(hookId, nCode, wParam, lParam);
        }

        private static void HookThreadMain()
        {
            try
            {
                hookProc = HookCallback;
                hookId = SetWindowsHookEx(WH_KEYBOARD_LL, hookProc, IntPtr.Zero, 0);
                if (hookId == IntPtr.Zero)
                {
                    Log("SetWindowsHookEx failed err=" + Marshal.GetLastWin32Error());
                    return;
                }
                hookThreadId = GetCurrentThreadId();
                hookActive = true;
                Log("hook ACTIVE tid=" + hookThreadId + " pid=" + Process.GetCurrentProcess().Id);
                Application.Run();
                UnhookWindowsHookEx(hookId);
                hookId = IntPtr.Zero;
                Log("hook stopped");
            }
            catch (Exception ex)
            {
                Log("hook error: " + ex.Message);
            }
            finally
            {
                hookActive = false;
                Pressed.Clear();
            }
        }

        public static void RunHookUntilUnlock(string logPath, string unlockPath, string pidPath)
        {
            LogPath = logPath;
            UnlockPath = unlockPath;
            if (File.Exists(UnlockPath)) try { File.Delete(UnlockPath); } catch { }
            try { File.WriteAllText(pidPath, Process.GetCurrentProcess().Id.ToString(), Encoding.ASCII); } catch { }

            hookThread = new Thread(HookThreadMain) { IsBackground = false, Name = "StudyFlowHook" };
            hookThread.SetApartmentState(ApartmentState.STA);
            hookThread.Start();

            for (int i = 0; i < 40 && !hookActive; i++)
                Thread.Sleep(50);

            while (!File.Exists(UnlockPath))
                Thread.Sleep(150);

            if (hookThreadId != 0)
                PostThreadMessage(hookThreadId, WM_QUIT, IntPtr.Zero, IntPtr.Zero);
            if (hookThread != null && hookThread.IsAlive)
                hookThread.Join(3000);

            try { if (File.Exists(pidPath)) File.Delete(pidPath); } catch { }
            try { if (File.Exists(UnlockPath)) File.Delete(UnlockPath); } catch { }
        }

        public static bool IsHookProcessRunning(string pidPath)
        {
            try
            {
                if (!File.Exists(pidPath)) return false;
                int pid = int.Parse(File.ReadAllText(pidPath).Trim());
                var p = Process.GetProcessById(pid);
                return p != null && !p.HasExited;
            }
            catch { return false; }
        }
    }

    internal static class Program
    {
        private static string TempDir { get { return Path.GetTempPath(); } }
        private static string LogPath { get { return Path.Combine(TempDir, "studyflow-lock.log"); } }
        private static string UnlockPath { get { return Path.Combine(TempDir, "studyflow-lock.unlock"); } }
        private static string ShieldFlag { get { return Path.Combine(TempDir, "studyflow-shield.on"); } }
        private static string PidPath { get { return Path.Combine(TempDir, "studyflow-lock.pid"); } }

        private static string ExePath
        {
            get { return Process.GetCurrentProcess().MainModule.FileName; }
        }

        private static void Log(string msg)
        {
            try { File.AppendAllText(LogPath, DateTime.Now.ToString("o") + " " + msg + Environment.NewLine, Encoding.UTF8); } catch { }
        }

        private static string JsonReply(bool ok, bool locked, string detail)
        {
            detail = (detail ?? "").Replace("\\", "\\\\").Replace("\"", "\\\"");
            return "{\"ok\":" + (ok ? "true" : "false")
                + ",\"locked\":" + (locked ? "true" : "false")
                + ",\"detail\":\"" + detail + "\""
                + (ok ? ",\"pong\":true" : "") + "}";
        }

        private static void ParseCmd(string json, out string cmd)
        {
            cmd = "";
            if (string.IsNullOrEmpty(json)) return;
            int i = json.IndexOf("\"cmd\"", StringComparison.OrdinalIgnoreCase);
            if (i < 0) return;
            int q = json.IndexOf(':', i);
            int a = json.IndexOf('"', q + 1);
            int b = json.IndexOf('"', a + 1);
            if (a >= 0 && b > a) cmd = json.Substring(a + 1, b - a - 1).ToUpperInvariant();
        }

        private static bool SpawnHookChild()
        {
            if (KeyLock.IsHookProcessRunning(PidPath))
            {
                Log("hook child already running");
                return true;
            }
            try { if (File.Exists(UnlockPath)) File.Delete(UnlockPath); } catch { }
            try { File.WriteAllText(ShieldFlag, "1", Encoding.ASCII); } catch { }

            var psi = new ProcessStartInfo(ExePath, "--hook")
            {
                UseShellExecute = false,
                CreateNoWindow = true,
                WorkingDirectory = Path.GetDirectoryName(ExePath)
            };
            Process.Start(psi);
            for (int i = 0; i < 30; i++)
            {
                Thread.Sleep(100);
                if (KeyLock.IsHookProcessRunning(PidPath)) return true;
            }
            Log("hook child failed to start");
            return false;
        }

        private static void StopHookChild()
        {
            Log("stopping hook child");
            try { if (File.Exists(ShieldFlag)) File.Delete(ShieldFlag); } catch { }
            try { File.WriteAllText(UnlockPath, "1", Encoding.ASCII); } catch { }
            Thread.Sleep(400);
            if (KeyLock.IsHookProcessRunning(PidPath))
            {
                try
                {
                    int pid = int.Parse(File.ReadAllText(PidPath).Trim());
                    Process.GetProcessById(pid).Kill();
                }
                catch { }
            }
            try { if (File.Exists(PidPath)) File.Delete(PidPath); } catch { }
            try { if (File.Exists(UnlockPath)) File.Delete(UnlockPath); } catch { }
        }

        private static void RunNativeHost()
        {
            Log("native host started pid=" + Process.GetCurrentProcess().Id);
            while (true)
            {
                string json = NativeIo.ReadMessage();
                if (json == null) break;
                string cmd;
                ParseCmd(json, out cmd);
                Log("cmd=" + cmd);

                switch (cmd)
                {
                    case "PING":
                        bool alive = KeyLock.IsHookProcessRunning(PidPath);
                        NativeIo.WriteMessage(JsonReply(true, alive, "pong"));
                        break;
                    case "LOCK_ON":
                        bool on = SpawnHookChild();
                        NativeIo.WriteMessage(JsonReply(on, on, on ? "hook_child_started" : "hook_start_failed"));
                        break;
                    case "LOCK_OFF":
                        StopHookChild();
                        NativeIo.WriteMessage(JsonReply(true, false, "unlocked"));
                        break;
                    default:
                        NativeIo.WriteMessage("{\"ok\":false,\"error\":\"unknown_cmd\"}");
                        break;
                }
            }
            Log("native host stdin closed");
        }

        private static void RunHookChild()
        {
            Log("hook child starting pid=" + Process.GetCurrentProcess().Id);
            KeyLock.RunHookUntilUnlock(LogPath, UnlockPath, PidPath);
            Log("hook child exiting");
        }

        private static void RunWatcher()
        {
            Log("watcher started");
            while (true)
            {
                if (File.Exists(ShieldFlag))
                {
                    if (!KeyLock.IsHookProcessRunning(PidPath))
                        SpawnHookChild();
                }
                else if (KeyLock.IsHookProcessRunning(PidPath))
                {
                    StopHookChild();
                }
                Thread.Sleep(350);
            }
        }

        [STAThread]
        private static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                if (args[0].Equals("--hook", StringComparison.OrdinalIgnoreCase))
                {
                    RunHookChild();
                    return;
                }
                if (args[0].Equals("--watch", StringComparison.OrdinalIgnoreCase))
                {
                    RunWatcher();
                    return;
                }
            }
            RunNativeHost();
        }
    }
}
