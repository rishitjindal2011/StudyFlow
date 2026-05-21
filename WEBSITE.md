# StudyFlow website + Windows installer

## Public site (GitHub Pages)

1. Repo → **Settings** → **Pages** → Source: branch `main`, folder **`/STUDY`**
2. Your URLs:
   - **Home / download page:** `https://rishitjindal2011.github.io/StudyFlow/`
   - **Web app:** `https://rishitjindal2011.github.io/StudyFlow/studyflow.html`

`index.html` is the professional landing page with **Download for Windows**.  
`studyflow.html` is the full app in the browser.

## Professional install flow (website → .exe → app)

```
Visitor opens your site
    → clicks "Download for Windows"
    → runs StudyFlow-Setup-1.0.0.exe
    → installs like normal software
    → opens StudyFlow from Start menu / desktop
```

### 1. Build the installer (on your PC)

```powershell
cd STUDY\desktop
.\Build-Desktop.ps1
```

Creates:

- `STUDY\desktop\dist\StudyFlow-Setup-1.0.0.exe` — **installer for the website**
- `STUDY\desktop\dist\StudyFlow-App.exe` — portable (optional)

### 2. Publish the installer (GitHub Releases)

Installers are too large for Pages. Host them on **Releases**:

```powershell
cd STUDY\desktop
.\Publish-Installer.ps1
```

Or manually: GitHub → **Releases** → **New release** → tag `v1.0.0` → upload `StudyFlow-Setup-1.0.0.exe`.

### 3. Match the download link

Edit `STUDY/site-config.js` when the version changes:

- `version`
- `installerFile` (must match the uploaded filename)

The home page button uses:

`https://github.com/rishitjindal2011/StudyFlow/releases/latest/download/StudyFlow-Setup-1.0.0.exe`

## What works where

| Feature | Website only | **Installed app** | Chrome extension |
|--------|--------------|-------------------|------------------|
| Timer, AI, stats, themes | Yes | Yes | Yes |
| Alt+Tab block (Windows) | No | **Yes** | Yes (PC Lock) |
| Block other Chrome tabs | No | No | Yes |

## PWA

On the live site, users can still **Install StudyFlow** from the browser menu (`manifest.webmanifest`).

## Chrome extension (optional)

Load unpacked from the `STUDY` folder for blocking **other browser tabs** + PC Lock in Chrome.
