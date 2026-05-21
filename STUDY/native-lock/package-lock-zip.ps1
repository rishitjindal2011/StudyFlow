# Maintainer: build StudyFlow-Lock-Windows.zip to host on your website / GitHub Releases
$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$out = Join-Path (Split-Path $dir -Parent) 'StudyFlow-Lock-Windows.zip'
if (Test-Path $out) { Remove-Item $out -Force }
$setupExe = Join-Path $dir 'dist\StudyFlow-Lock-Setup.exe'
if (Test-Path $setupExe) {
  $out = Join-Path (Split-Path $dir -Parent) 'StudyFlow-Lock-Windows.zip'
  if (Test-Path $out) { Remove-Item $out -Force }
  $temp = Join-Path $env:TEMP ('sf-lock-' + [guid]::NewGuid().ToString())
  New-Item -ItemType Directory -Path $temp | Out-Null
  Copy-Item $setupExe (Join-Path $temp 'StudyFlow-Lock-Setup.exe') -Force
  Copy-Item (Join-Path $dir 'USER-INSTALL.md') $temp -Force -ErrorAction SilentlyContinue
  Compress-Archive -Path (Join-Path $temp '*') -DestinationPath $out -Force
  Remove-Item $temp -Recurse -Force
  Write-Host "Created (exe build): $out"
  exit 0
}

Write-Host 'StudyFlow-Lock-Setup.exe not found — run build-exe.ps1 first, or packaging legacy BAT zip...'
$include = @(
  'host.py', 'host.bat', 'lock_daemon.py', 'com.studyflow.lock.json',
  'Install-StudyFlow-Lock.bat', 'install-user.ps1', 'unlock-now.bat',
  'run-daemon-admin.bat', 'README.md', 'USER-INSTALL.md'
)
$temp = Join-Path $env:TEMP ('sf-lock-' + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null
foreach ($name in $include) {
  $p = Join-Path $dir $name
  if (Test-Path $p) { Copy-Item $p (Join-Path $temp $name) }
}
Compress-Archive -Path (Join-Path $temp '*') -DestinationPath $out -Force
Remove-Item $temp -Recurse -Force
Write-Host "Created: $out"
Write-Host 'Upload this ZIP. Users unzip and double-click Install-StudyFlow-Lock.bat'
