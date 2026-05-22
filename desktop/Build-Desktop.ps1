# Build StudyFlow standalone Windows app (.exe, no Chrome)
$ErrorActionPreference = 'Stop'
$desktopDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$studyDir = Split-Path -Parent $desktopDir
$nativeDir = Join-Path $studyDir 'native-lock'

Write-Host '=== StudyFlow Desktop Build ===' -ForegroundColor Cyan

# 1) Alt+Tab lock helper
$compile = Join-Path $nativeDir 'Compile-StudyFlowLock.ps1'
if (Test-Path $compile) {
  & powershell -NoProfile -ExecutionPolicy Bypass -File $compile
  if (-not (Test-Path (Join-Path $nativeDir 'StudyFlowLockHost.exe'))) {
    throw 'StudyFlowLockHost.exe build failed'
  }
}

# 2) npm + electron-builder
Push-Location $desktopDir
try {
  if (-not (Test-Path 'node_modules')) {
    Write-Host 'Installing npm packages (first time may take a few minutes)...'
    npm install
  }
  Write-Host 'Packaging StudyFlow-App.exe ...'
  $env:CSC_IDENTITY_AUTO_DISCOVERY = 'false'
  npm run dist

  Write-Host 'Building website installer (StudyFlow-Setup)...' -ForegroundColor Cyan
  & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $desktopDir 'Build-Installer.ps1')

  $out = Join-Path $desktopDir 'dist'
  Get-ChildItem $out -Filter '*.exe' -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host ('Built: {0} ({1:N1} MB)' -f $_.FullName, ($_.Length / 1MB)) -ForegroundColor Green
  }
} finally {
  Pop-Location
}

Write-Host ''
Write-Host 'Website download (installer):  dist\StudyFlow-Setup-1.0.0.exe' -ForegroundColor Yellow
Write-Host 'Publish to GitHub:             .\Publish-Installer.ps1' -ForegroundColor Yellow
Write-Host 'Dev run:                       npm start' -ForegroundColor Yellow
