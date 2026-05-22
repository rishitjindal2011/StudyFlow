# Quick install when Setup.exe is old — copies StudyFlowLockHost.exe + registers Chrome host
param(
  [Parameter(Mandatory = $true)]
  [string]$ExtensionId
)

$ErrorActionPreference = 'Stop'
$srcDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$destDir = Join-Path $env:LOCALAPPDATA 'StudyFlow\pc-lock'
$hostExe = Join-Path $destDir 'StudyFlowLockHost.exe'

New-Item -ItemType Directory -Path $destDir -Force | Out-Null

$bundled = Join-Path $srcDir 'StudyFlowLockHost.exe'
if (-not (Test-Path $bundled)) {
  Write-Error "Put StudyFlowLockHost.exe next to this script, or run StudyFlow-Lock-Setup.exe"
}

Copy-Item $bundled $hostExe -Force

$manifestPath = Join-Path $destDir 'com.studyflow.lock.installed.json'
@{
  name            = 'com.studyflow.lock'
  description     = 'StudyFlow PC lock'
  path            = $hostExe
  type            = 'stdio'
  allowed_origins = @("chrome-extension://$($ExtensionId.Trim().ToLower())/")
} | ConvertTo-Json -Depth 4 | Set-Content -Path $manifestPath -Encoding UTF8

$regPath = 'HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.studyflow.lock'
New-Item -Path $regPath -Force | Out-Null
Set-ItemProperty -Path $regPath -Name '(default)' -Value $manifestPath

Write-Host "Installed: $hostExe"
Write-Host "Extension ID: $($ExtensionId.Trim().ToLower())"
Write-Host 'Reload StudyFlow, Check connection, start focus.'
