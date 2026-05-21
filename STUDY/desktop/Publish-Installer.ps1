# Build Windows installer + upload to GitHub Releases (website download button)
param(
  [string]$Version = '1.0.0',
  [string]$Tag = '',
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$desktopDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $Tag) { $Tag = "v$Version" }

if (-not $SkipBuild) {
  & (Join-Path $desktopDir 'Build-Desktop.ps1')
} elseif (-not (Test-Path (Join-Path $desktopDir "dist\StudyFlow-Setup-$Version.exe"))) {
  & (Join-Path $desktopDir 'Build-Installer.ps1')
}

$setup = Join-Path $desktopDir "dist\StudyFlow-Setup-$Version.exe"
$portable = Join-Path $desktopDir 'dist\StudyFlow-App.exe'

if (-not (Test-Path $setup)) {
  throw "Missing installer: $setup — run Build-Desktop.ps1 first"
}

$gh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $gh) {
  Write-Host ''
  Write-Host 'Installer built. Upload manually:' -ForegroundColor Yellow
  Write-Host "  1. GitHub repo -> Releases -> New release -> tag $Tag"
  Write-Host "  2. Upload: $setup"
  if (Test-Path $portable) { Write-Host "           $portable" }
  Write-Host '  3. Publish — download button on the website will work.'
  Write-Host ''
  Write-Host "Files:" -ForegroundColor Cyan
  Get-Item $setup, $portable -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host ('  {0} ({1:N1} MB)' -f $_.Name, ($_.Length / 1MB))
  }
  exit 0
}

Write-Host "Creating release $Tag ..." -ForegroundColor Cyan
$notes = @"
StudyFlow Windows desktop app.

**Install:** run ``StudyFlow-Setup-$Version.exe`` → open StudyFlow from Start menu.
**Portable:** ``StudyFlow-App.exe`` (no install).

Alt+Tab blocks during focus. No Chrome extension required.
"@

$assets = @($setup)
if (Test-Path $portable) { $assets += $portable }

gh release create $Tag @assets --title "StudyFlow $Version" --notes $notes
Write-Host ''
Write-Host 'Published. Website download:' -ForegroundColor Green
Write-Host "  https://github.com/rishitjindal2011/StudyFlow/releases/latest/download/StudyFlow-Setup-$Version.exe"
