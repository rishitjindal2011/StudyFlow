# Removes StudyFlow PC Lock so you can reinstall / test Setup.exe fresh
$ErrorActionPreference = 'SilentlyContinue'

Write-Host ''
Write-Host 'StudyFlow PC Lock — Uninstall'
Write-Host '============================='
Write-Host ''

$destDir = Join-Path $env:LOCALAPPDATA 'StudyFlow\pc-lock'
$regPath = 'HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.studyflow.lock'
$taskName = 'StudyFlowLockWatcher'

# Stop hooks / daemons
$unlock = Join-Path $env:TEMP 'studyflow-lock.unlock'
$shield = Join-Path $env:TEMP 'studyflow-shield.on'
Set-Content -Path $unlock -Value '1' -Encoding ASCII -ErrorAction SilentlyContinue
if (Test-Path $shield) { Remove-Item $shield -Force }

foreach ($img in @('StudyFlowLockHost.exe', 'studyflow-lock-daemon.exe', 'studyflow-lock-host.exe')) {
  & taskkill.exe /IM $img /F /T 2>$null | Out-Null
}
Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" -ErrorAction SilentlyContinue |
  Where-Object {
    $_.CommandLine -like '*lock-daemon*' -or $_.CommandLine -like '*host-bridge*' -or
    $_.CommandLine -like '*StudyFlowLock*'
  } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

Start-Sleep -Milliseconds 400

# Remove scheduled task
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Remove Chrome native messaging registration
Remove-Item -Path $regPath -Recurse -Force -ErrorAction SilentlyContinue

# Remove installed files
if (Test-Path $destDir) {
  Remove-Item -Path $destDir -Recurse -Force -ErrorAction SilentlyContinue
  Write-Host "Removed: $destDir"
} else {
  Write-Host 'PC lock folder was not installed (already clean).'
}

# Temp cleanup
foreach ($f in @('studyflow-lock.pid', 'studyflow-lock.unlock', 'studyflow-shield.on', 'studyflow-lock.log', 'studyflow-lock.hb')) {
  $p = Join-Path $env:TEMP $f
  if (Test-Path $p) { Remove-Item $p -Force -ErrorAction SilentlyContinue }
}

Write-Host 'Registry entry removed (if present).'
Write-Host ''
Write-Host 'Done. You can now:'
Write-Host '  1. Reload StudyFlow at chrome://extensions'
Write-Host '  2. Block tab -> Install PC Lock -> run StudyFlow-Lock-Setup.exe'
Write-Host ''
