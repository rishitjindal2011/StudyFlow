// StudyFlow-Lock-Setup.exe — installs StudyFlowLockHost.exe + Chrome native messaging (same as .bat)
using System;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using Microsoft.Win32;

namespace StudyFlowSetup
{
    internal static class Program
    {
        private const string AppName = "StudyFlow";
        private const string HostName = "StudyFlowLockHost.exe";
        private const string HostSrcName = "StudyFlowLockHost.cs";
        private const string IdFileName = "studyflow-lock.id";
        private const string ManifestName = "com.studyflow.lock.installed.json";
        private const string NativeName = "com.studyflow.lock";

        private static string ExeDir
        {
            get { return Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location); }
        }

        private static string DestDir
        {
            get { return Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), AppName, "pc-lock"); }
        }

        private static string HostDest
        {
            get { return Path.Combine(DestDir, HostName); }
        }

        private static bool ValidExtId(string s)
        {
            return !string.IsNullOrEmpty(s) && Regex.IsMatch(s.Trim(), "^[a-p]{32}$");
        }

        private static string FindExtensionId()
        {
            string[] paths = {
                Path.Combine(ExeDir, IdFileName),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Downloads", IdFileName)
            };
            foreach (string p in paths)
            {
                try
                {
                    if (!File.Exists(p)) continue;
                    string id = File.ReadAllText(p, Encoding.UTF8).Trim().ToLowerInvariant();
                    if (ValidExtId(id)) return id;
                }
                catch { }
            }
            try
            {
                string clip = Clipboard.GetText();
                if (!string.IsNullOrEmpty(clip))
                {
                    string id = clip.Trim().ToLowerInvariant();
                    if (ValidExtId(id)) return id;
                }
            }
            catch { }

            using (var f = new Form { Width = 480, Height = 200, FormBorderStyle = FormBorderStyle.FixedDialog, Text = "StudyFlow Lock", StartPosition = FormStartPosition.CenterScreen, MaximizeBox = false, MinimizeBox = false })
            {
                var lbl = new Label { Left = 16, Top = 16, Width = 440, Text = "Paste your StudyFlow Extension ID (from Block tab, 32 letters a-p):" };
                var tb = new TextBox { Left = 16, Top = 48, Width = 440 };
                var ok = new Button { Text = "OK", Left = 360, Top = 88, Width = 96, DialogResult = DialogResult.OK };
                f.Controls.Add(lbl);
                f.Controls.Add(tb);
                f.Controls.Add(ok);
                f.AcceptButton = ok;
                if (f.ShowDialog() == DialogResult.OK)
                    return tb.Text.Trim().ToLowerInvariant();
            }
            return null;
        }

        private static string FindCsc()
        {
            string windir = Environment.GetFolderPath(Environment.SpecialFolder.Windows);
            string[] rels = {
                @"Microsoft.NET\Framework64\v4.0.30319\csc.exe",
                @"Microsoft.NET\Framework\v4.0.30319\csc.exe"
            };
            foreach (string rel in rels)
            {
                string p = Path.Combine(windir, rel);
                if (File.Exists(p)) return p;
            }
            return null;
        }

        private static void ExtractResource(string resName, string outPath)
        {
            using (Stream s = Assembly.GetExecutingAssembly().GetManifestResourceStream(resName))
            {
                if (s == null) throw new FileNotFoundException("Embedded resource missing: " + resName);
                Directory.CreateDirectory(Path.GetDirectoryName(outPath));
                using (FileStream fs = File.Create(outPath))
                    s.CopyTo(fs);
            }
        }

        private static void EnsureHostExe()
        {
            Directory.CreateDirectory(DestDir);

            string beside = Path.Combine(ExeDir, HostName);
            if (File.Exists(beside))
            {
                File.Copy(beside, HostDest, true);
                return;
            }

            try
            {
                ExtractResource(HostName, HostDest);
                if (File.Exists(HostDest)) return;
            }
            catch { }

            string csPath = Path.Combine(ExeDir, HostSrcName);
            if (!File.Exists(csPath))
            {
                csPath = Path.Combine(DestDir, HostSrcName);
                try { ExtractResource(HostSrcName, csPath); } catch { }
            }

            if (!File.Exists(csPath))
                throw new FileNotFoundException("Missing " + HostName + " — re-download from StudyFlow.");

            string csc = FindCsc();
            if (csc == null)
                throw new InvalidOperationException(".NET Framework is required.");

            var psi = new System.Diagnostics.ProcessStartInfo
            {
                FileName = csc,
                Arguments = string.Format(
                    "/nologo /target:winexe /optimize+ /out:\"{0}\" /reference:System.dll /reference:System.Windows.Forms.dll /reference:System.Drawing.dll \"{1}\"",
                    HostDest, csPath),
                UseShellExecute = false,
                CreateNoWindow = true
            };
            var proc = System.Diagnostics.Process.Start(psi);
            proc.WaitForExit(60000);
            if (proc.ExitCode != 0 || !File.Exists(HostDest))
                throw new InvalidOperationException("Could not build StudyFlowLockHost.exe.");
        }

        private static void WriteManifest(string extId)
        {
            string manifestPath = Path.Combine(DestDir, ManifestName);
            string json = "{\r\n"
                + "  \"name\": \"" + NativeName + "\",\r\n"
                + "  \"description\": \"StudyFlow PC lock\",\r\n"
                + "  \"path\": \"" + HostDest.Replace("\\", "\\\\") + "\",\r\n"
                + "  \"type\": \"stdio\",\r\n"
                + "  \"allowed_origins\": [ \"chrome-extension://" + extId + "/\" ]\r\n"
                + "}\r\n";
            File.WriteAllText(manifestPath, json, Encoding.UTF8);
            using (RegistryKey key = Registry.CurrentUser.CreateSubKey(@"Software\Google\Chrome\NativeMessagingHosts\" + NativeName))
            {
                if (key != null) key.SetValue("", manifestPath, RegistryValueKind.String);
            }
        }

        [STAThread]
        private static void Main()
        {
            try
            {
                string extId = FindExtensionId();
                if (!ValidExtId(extId))
                {
                    MessageBox.Show("Invalid or missing Extension ID.", "StudyFlow Lock", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }

                EnsureHostExe();
                WriteManifest(extId);

                MessageBox.Show(
                    "StudyFlow PC Lock is installed.\n\n"
                    + HostDest + "\n\n"
                    + "Reload StudyFlow, then Check connection and start a focus session.",
                    "StudyFlow Lock",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Install failed:\n\n" + ex.Message, "StudyFlow Lock", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Environment.ExitCode = 1;
            }
        }
    }
}
