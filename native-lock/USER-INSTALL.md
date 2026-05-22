# StudyFlow Lock — for people who only installed the Chrome extension

You do **not** need the StudyFlow source code. Chrome extensions cannot block Alt+Tab by themselves — this small Windows helper does that during focus sessions.

## One-time setup (2 clicks)

1. StudyFlow → **Block** → **Install PC Lock** (extension ID is filled in for you).
2. Open **`StudyFlow-Lock-Setup.exe`** from your **Downloads** folder (double-click).
3. Click **Check connection** in StudyFlow — should say **Ready**.

No zip, no paste, no Python.

## Alt+Tab stuck?

Double-click **`unlock-now.bat`** in the same folder.

## Uninstall

```powershell
Remove-Item "HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.studyflow.lock" -Recurse -Force
Remove-Item "$env:LOCALAPPDATA\StudyFlow\pc-lock" -Recurse -Force
taskkill /IM python.exe /F 2>$null
```
