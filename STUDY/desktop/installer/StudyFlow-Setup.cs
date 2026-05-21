// StudyFlow-Setup.exe — installs desktop app to %LOCALAPPDATA%\Programs\StudyFlow
using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Text;
using System.Windows.Forms;
using Microsoft.Win32;

namespace StudyFlowInstaller
{
    internal static class Program
    {
        private const string AppName = "StudyFlow";
        private const string ZipResource = "StudyFlowApp.zip";
        private const string ExeName = "StudyFlow.exe";
        private const string UninstallKey = @"Software\Microsoft\Windows\CurrentVersion\Uninstall\StudyFlow";

        private static string InstallDir
        {
            get
            {
                return Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "Programs", AppName);
            }
        }

        private static string ExePath
        {
            get { return Path.Combine(InstallDir, ExeName); }
        }

        private static string ExeDir
        {
            get { return Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location); }
        }

        [STAThread]
        private static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            bool exists = File.Exists(ExePath);
            string msg = exists
                ? "StudyFlow is already installed.\r\n\r\nReinstall / repair?"
                : "Install StudyFlow on this PC?\r\n\r\n• Desktop & Start menu shortcuts\r\n• No Chrome required\r\n• Alt+Tab blocked during focus";

            if (MessageBox.Show(msg, AppName + " Setup", MessageBoxButtons.YesNo,
                    exists ? MessageBoxIcon.Question : MessageBoxIcon.Information) != DialogResult.Yes)
                return;

            using (var form = new InstallForm())
            {
                if (form.ShowDialog() != DialogResult.OK)
                {
                    if (!string.IsNullOrEmpty(form.Error))
                        MessageBox.Show(form.Error, AppName + " Setup", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
            }

            string done = "StudyFlow was installed successfully.\r\n\r\nOpen it from your Desktop or Start menu.";
            if (MessageBox.Show(done + "\r\n\r\nLaunch StudyFlow now?", AppName + " Setup",
                    MessageBoxButtons.YesNo, MessageBoxIcon.Information) == DialogResult.Yes)
            {
                try
                {
                    Process.Start(new ProcessStartInfo(ExePath) { WorkingDirectory = InstallDir });
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Could not start app: " + ex.Message, AppName, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
            }
        }

        private sealed class InstallForm : Form
        {
            private readonly Label status = new Label();
            private readonly ProgressBar bar = new ProgressBar();
            public string Error { get; private set; }

            public InstallForm()
            {
                Text = "StudyFlow Setup";
                Width = 440;
                Height = 180;
                FormBorderStyle = FormBorderStyle.FixedDialog;
                StartPosition = FormStartPosition.CenterScreen;
                MaximizeBox = false;
                MinimizeBox = false;
                status.Left = 16;
                status.Top = 16;
                status.Width = 400;
                status.Height = 40;
                bar.Left = 16;
                bar.Top = 64;
                bar.Width = 400;
                bar.Style = ProgressBarStyle.Marquee;
                bar.MarqueeAnimationSpeed = 30;
                Controls.Add(status);
                Controls.Add(bar);
                Shown += OnShown;
            }

            private void OnShown(object sender, EventArgs e)
            {
                try
                {
                    status.Text = "Installing…";
                    DoInstall();
                    DialogResult = DialogResult.OK;
                    Close();
                }
                catch (Exception ex)
                {
                    Error = ex.Message;
                    DialogResult = DialogResult.Cancel;
                    Close();
                }
            }

            private static void DoInstall()
            {
                if (Directory.Exists(InstallDir))
                {
                    try
                    {
                        foreach (var p in Directory.GetFiles(InstallDir, "*", SearchOption.AllDirectories))
                        {
                            try { File.SetAttributes(p, FileAttributes.Normal); } catch { }
                        }
                        Directory.Delete(InstallDir, true);
                    }
                    catch
                    {
                        throw new IOException("Close StudyFlow if it is running, then try again.");
                    }
                }
                Directory.CreateDirectory(InstallDir);

                var asm = Assembly.GetExecutingAssembly();
                using (var stream = asm.GetManifestResourceStream(ZipResource))
                {
                    if (stream == null)
                        throw new InvalidOperationException("Installer package is corrupt (missing app bundle).");
                    string zipPath = Path.Combine(Path.GetTempPath(), "studyflow-app-" + Guid.NewGuid().ToString("N") + ".zip");
                    try
                    {
                        using (var fs = File.Create(zipPath))
                            stream.CopyTo(fs);
                        ZipFile.ExtractToDirectory(zipPath, InstallDir);
                    }
                    finally
                    {
                        try { if (File.Exists(zipPath)) File.Delete(zipPath); } catch { }
                    }
                }

                if (!File.Exists(ExePath))
                    throw new FileNotFoundException("StudyFlow.exe not found after install.");

                CreateShortcut(Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory),
                    AppName + ".lnk"));
                string programs = Environment.GetFolderPath(Environment.SpecialFolder.Programs);
                string menuDir = Path.Combine(programs, AppName);
                Directory.CreateDirectory(menuDir);
                CreateShortcut(Path.Combine(menuDir, AppName + ".lnk"));
                RegisterUninstall();
            }

            private static void CreateShortcut(string lnkPath)
            {
                try
                {
                    var t = Type.GetTypeFromProgID("WScript.Shell");
                    if (t == null) return;
                    dynamic shell = Activator.CreateInstance(t);
                    dynamic sc = shell.CreateShortcut(lnkPath);
                    sc.TargetPath = ExePath;
                    sc.WorkingDirectory = InstallDir;
                    sc.Description = "StudyFlow — Focus & Study";
                    sc.Save();
                }
                catch { }
            }

            private static void RegisterUninstall()
            {
                try
                {
                    using (var key = Registry.CurrentUser.CreateSubKey(UninstallKey))
                    {
                        if (key == null) return;
                        key.SetValue("DisplayName", AppName);
                        key.SetValue("DisplayVersion", "1.0.0");
                        key.SetValue("Publisher", AppName);
                        key.SetValue("InstallLocation", InstallDir);
                        key.SetValue("DisplayIcon", ExePath);
                        key.SetValue("NoModify", 1, RegistryValueKind.DWord);
                        key.SetValue("NoRepair", 1, RegistryValueKind.DWord);
                        string uninstall = Path.Combine(InstallDir, "Uninstall-StudyFlow.bat");
                        File.WriteAllText(uninstall,
                            "@echo off\r\n" +
                            "taskkill /IM StudyFlow.exe /F 2>nul\r\n" +
                            "timeout /t 1 /nobreak >nul\r\n" +
                            "rd /s /q \"" + InstallDir + "\"\r\n" +
                            "reg delete \"HKCU\\" + UninstallKey.Replace(@"\", @"\\") + "\" /f 2>nul\r\n" +
                            "del \"%USERPROFILE%\\Desktop\\StudyFlow.lnk\" 2>nul\r\n" +
                            "echo StudyFlow removed.\r\npause\r\n",
                            Encoding.ASCII);
                        key.SetValue("UninstallString", "\"" + uninstall + "\"");
                    }
                }
                catch { }
            }
        }
    }
}
