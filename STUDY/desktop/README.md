# StudyFlow Desktop App (Windows)

Professional flow: **website → download installer → install → app in Start menu**.

## Build installer + portable

```powershell
cd STUDY\desktop
.\Build-Desktop.ps1
```

Outputs:

| File | Use |
|------|-----|
| `dist\StudyFlow-Setup-1.0.0.exe` | **Installer** — for the website download button |
| `dist\StudyFlow-App.exe` | Portable — no install (optional) |

## Publish so the website download works

GitHub Pages cannot host 100MB files. Upload the installer to **GitHub Releases**:

```powershell
.\Publish-Installer.ps1
```

(Requires [GitHub CLI](https://cli.github.com/) `gh auth login`, or upload manually in the repo **Releases** tab.)

The landing page `index.html` links to:

`https://github.com/rishitjindal2011/StudyFlow/releases/latest/download/StudyFlow-Setup-1.0.0.exe`

Update version in `STUDY/site-config.js` and `package.json` when you ship a new build.

## What users do

1. Open your site (e.g. `https://rishitjindal2011.github.io/StudyFlow/`).
2. Click **Download for Windows**.
3. Run **StudyFlow-Setup** → Install.
4. Open **StudyFlow** from desktop / Start menu.

During focus: **Alt+Tab** blocked, fullscreen, no Chrome.

## Dev (no build)

```powershell
npm install
npm start
```

## Limits

- This is **Windows only** (keyboard hook + Electron).
- First launch may download the Chromium runtime (bundled in the .exe after build).
- Some sites still won’t load in the in-app browser (iframe limits) — same as the website.
- Other apps/browsers on the PC are not blocked — only Alt+Tab and leaving StudyFlow during focus.

## Chrome extension path

You can still use Chrome + extension + PC Lock if you prefer. The desktop app is an alternative, not a replacement for GitHub Pages hosting.
