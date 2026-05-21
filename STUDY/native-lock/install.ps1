# StudyFlow PC Lock installer (Windows, current user)
# Usage: powershell -ExecutionPolicy Bypass -File install.ps1 -ExtensionId YOUR_EXTENSION_ID
param(
  [Parameter(Mandatory = $true)]
  [string]$ExtensionId
)

$ErrorActionPreference = "Stop"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$hostBat = Join-Path $dir "host.bat"
$manifestSrc = Join-Path $dir "com.studyflow.lock.json"
$manifestDst = Join-Path $dir "com.studyflow.lock.installed.json"

if (-not (Test-Path $hostBat)) {
  Write-Error "host.bat not found in $dir"
}

$json = Get-Content $manifestSrc -Raw
$escapedBat = $hostBat -replace '\\', '\\'
$json = $json.Replace('HOST_BAT_PATH', $escapedBat)
$json = $json.Replace('EXTENSION_ID', $ExtensionId.Trim())
Set-Content -Path $manifestDst -Value $json -Encoding UTF8

$regPath = 'HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.studyflow.lock'
New-Item -Path $regPath -Force | Out-Null
Set-ItemProperty -Path $regPath -Name '(default)' -Value $manifestDst

Write-Host 'Installed StudyFlow PC Lock.'
Write-Host "Registry: $regPath"
Write-Host ''
Write-Host 'Next steps:'
Write-Host '  1. py -3 -m pip install keyboard'
Write-Host '  2. Reload StudyFlow at chrome://extensions'
Write-Host '  3. Start a focus session - PC lock turns on with the timer'
Write-Host '  4. If Alt+Tab still works, run Chrome as Administrator once to test'
Write-Host ''
Write-Host "Extension ID used: $ExtensionId"
