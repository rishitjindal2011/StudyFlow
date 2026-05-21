# StudyFlow PC Lock (Windows)

Blocks **Alt+Tab, Win+Tab, Win key**, etc. during focus sessions.

**Chrome Web Store users do not have this repo.** Ship `StudyFlow-Lock-Windows.zip` (see below) and link it from StudyFlow → Block tab (`PC_LOCK_DOWNLOAD_URL` in `studyflow.js`).

## Ship to users (maintainer)

Build the installer (requires Python on **your** machine only):

```powershell
cd native-lock
pip install -r requirements-build.txt
powershell -ExecutionPolicy Bypass -File build-exe.ps1
```

Outputs:

- `dist/StudyFlow-Lock-Setup.exe` — give this to users
- `../StudyFlow-Lock-Windows.zip` — upload to your site / GitHub Releases

Set `PC_LOCK_DOWNLOAD_URL` in `studyflow.js` to the ZIP URL. Users unzip and run **`StudyFlow-Lock-Setup.exe`**. See `USER-INSTALL.md`.

Legacy (Python on user PC): `package-lock-zip.ps1` + `Install-StudyFlow-Lock.bat`.

## Disconnected? Reconnect

Also shown in StudyFlow → **Block** tab → **PC lock (Windows)**.

1. **Stuck Alt+Tab?** Double-click `unlock-now.bat` in this folder.
2. `py -3 -m pip install keyboard`
3. PowerShell in this folder:
   ```powershell
   powershell -ExecutionPolicy Bypass -File install.ps1 -ExtensionId YOUR_EXTENSION_ID
   ```
   Use the Extension ID from the Block tab (or `chrome://extensions` → StudyFlow → ID).
4. Reload StudyFlow at `chrome://extensions`.
5. Block tab → **Check again** — should say Connected.
6. Start a focus session. If Alt+Tab still works, run `run-daemon-admin.bat` as Administrator.
7. Log: `%TEMP%\studyflow-lock.log`

## Install

```powershell
cd "c:\Users\rishit\Downloads\Studyflow\STUDY\native-lock"
pip install keyboard
powershell -ExecutionPolicy Bypass -File install.ps1 -ExtensionId YOUR_EXTENSION_ID
```

Reload StudyFlow at `chrome://extensions`.

## Test without Chrome

```powershell
py -3 host.py
```

(Type messages manually only for dev — normally Chrome starts the host.)

Or start the daemon directly:

```powershell
py -3 lock_daemon.py
```

Try Alt+Tab. Press Ctrl+C to stop.

## Alt+Tab stuck after you closed StudyFlow?

Double-click **`unlock-now.bat`** in this folder. That kills the lock immediately.

Then reload StudyFlow at `chrome://extensions` (unlock-on-stop is fixed in the latest code).

## Alt+Tab still works?

1. Open `%TEMP%\studyflow-lock.log` — look for `daemon hooks active` or errors.
2. **Run as Administrator:** right-click `run-daemon-admin.bat` → Run as administrator, then start a focus session.
3. Re-run `install.ps1` if you reloaded the extension (ID can change in dev mode).

## Uninstall

```powershell
Remove-Item "HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.studyflow.lock" -Recurse -Force
taskkill /IM python.exe /F
del %TEMP%\studyflow-lock.pid
```
