# StudyFlow Lock — one-time install for end users (Chrome Web Store extension)
# Copies helper to %LOCALAPPDATA%\StudyFlow\pc-lock and registers native messaging.
# Usage: powershell -ExecutionPolicy Bypass -File install-user.ps1 -ExtensionId YOUR_ID
param(
  [Parameter(Mandatory = $true)]
  [string]$ExtensionId
)

$ErrorActionPreference = 'Stop'
$srcDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$destDir = Join-Path $env:LOCALAPPDATA 'StudyFlow\pc-lock'
$manifestSrc = Join-Path $srcDir 'com.studyflow.lock.json'
$manifestDst = Join-Path $destDir 'com.studyflow.lock.installed.json'
$hostBat = Join-Path $destDir 'host.bat'

Write-Host 'StudyFlow Lock installer'
Write-Host ''

if (-not (Test-Path $manifestSrc)) {
  Write-Error 'com.studyflow.lock.json not found. Run this from the StudyFlow Lock folder.'
}

New-Item -ItemType Directory -Path $destDir -Force | Out-Null
$exclude = @('com.studyflow.lock.installed.json', 'install.ps1', 'install-user.ps1', 'package-lock-zip.ps1')
Get-ChildItem -Path $srcDir -File | Where-Object { $exclude -notcontains $_.Name } | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination (Join-Path $destDir $_.Name) -Force
}

if (-not (Test-Path $hostBat)) {
  Write-Error 'host.bat missing after copy.'
}

$json = Get-Content $manifestSrc -Raw
$escapedBat = $hostBat -replace '\\', '\\'
$json = $json.Replace('HOST_BAT_PATH', $escapedBat)
$json = $json.Replace('EXTENSION_ID', $ExtensionId.Trim())
Set-Content -Path $manifestDst -Value $json -Encoding UTF8

$regPath = 'HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.studyflow.lock'
New-Item -Path $regPath -Force | Out-Null
Set-ItemProperty -Path $regPath -Name '(default)' -Value $manifestDst

Write-Host "Installed to: $destDir"
Write-Host "Registry: $regPath"
Write-Host ''

Write-Host 'Installing Python package keyboard (needed for Alt+Tab block)...'
$pipOk = $false
foreach ($py in @('py', 'python')) {
  if (Get-Command $py -ErrorAction SilentlyContinue) {
    & $py -3 -m pip install keyboard 2>$null
    if ($LASTEXITCODE -eq 0) { $pipOk = $true; break }
    & $py -m pip install keyboard 2>$null
    if ($LASTEXITCODE -eq 0) { $pipOk = $true; break }
  }
}
if (-not $pipOk) {
  Write-Host 'WARNING: Could not run pip. Install Python from https://www.python.org/downloads/'
  Write-Host 'Then run: py -3 -m pip install keyboard'
}

Write-Host ''
Write-Host 'Done. Next steps:'
Write-Host '  1. Reload StudyFlow at chrome://extensions'
Write-Host '  2. StudyFlow -> Block -> Check again (should say Connected)'
Write-Host '  3. Start a focus session to test Alt+Tab block'
Write-Host ''
Write-Host "Extension ID used: $ExtensionId"
