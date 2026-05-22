# Full repair — builds C# host .exe (Chrome stdin works) + registers native messaging + optional watcher task
param(
  [string]$ExtensionId = ''
)

$ErrorActionPreference = 'Stop'
$srcDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$destDir = Join-Path $env:LOCALAPPDATA 'StudyFlow\pc-lock'

Write-Host ''
Write-Host 'StudyFlow Lock — Full Repair'
Write-Host '============================'
Write-Host ''

if (-not (Test-Path $destDir)) {
  New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

# 1) Compile C# host (reliable Chrome native messaging)
Write-Host 'Building StudyFlowLockHost.exe ...'
& (Join-Path $srcDir 'Compile-StudyFlowLock.ps1')

$hostExe = Join-Path $destDir 'StudyFlowLockHost.exe'
if (-not (Test-Path $hostExe)) {
  $built = Join-Path $srcDir 'StudyFlowLockHost.exe'
  if (Test-Path $built) { Copy-Item $built $hostExe -Force }
}
if (-not (Test-Path $hostExe)) {
  Write-Host 'ERROR: Could not build StudyFlowLockHost.exe'
  exit 1
}

# 2) Copy helpers
$files = @('lock-daemon.ps1', 'host-bridge.ps1', 'host-bridge.bat', 'unlock-now.bat')
foreach ($f in $files) {
  $from = Join-Path $srcDir $f
  if (Test-Path $from) { Copy-Item $from (Join-Path $destDir $f) -Force }
}

# 3) Extension ID
$manifestPath = Join-Path $destDir 'com.studyflow.lock.installed.json'
if (-not $ExtensionId -and (Test-Path $manifestPath)) {
  $old = Get-Content $manifestPath -Raw | ConvertFrom-Json
  if ($old.allowed_origins -and $old.allowed_origins.Count -gt 0) {
    $ExtensionId = ($old.allowed_origins[0] -replace '^chrome-extension://', '' -replace '/$', '')
  }
}
if ($ExtensionId -notmatch '^[a-p]{32}$') {
  Write-Host ''
  Write-Host 'Open chrome://extensions — turn on Developer mode — copy StudyFlow ID (32 letters a-p)'
  $ExtensionId = (Read-Host 'Paste Extension ID here').Trim().ToLower()
}
if ($ExtensionId -notmatch '^[a-p]{32}$') {
  Write-Host 'Invalid extension ID.'
  exit 1
}

$newManifest = @{
  name            = 'com.studyflow.lock'
  description     = 'StudyFlow PC lock — blocks Alt+Tab during focus'
  path            = $hostExe
  type            = 'stdio'
  allowed_origins = @("chrome-extension://$ExtensionId/")
}
$newManifest | ConvertTo-Json -Depth 4 | Set-Content -Path $manifestPath -Encoding UTF8

$regPath = 'HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.studyflow.lock'
New-Item -Path $regPath -Force | Out-Null
Set-ItemProperty -Path $regPath -Name '(default)' -Value $manifestPath

# 4) Stop stuck daemons
$prevEa = $ErrorActionPreference
$ErrorActionPreference = 'SilentlyContinue'
foreach ($img in @('studyflow-lock-daemon.exe', 'StudyFlowLockHost.exe')) {
  & taskkill.exe /IM $img /F /T 2>$null | Out-Null
}
Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like '*lock-daemon.ps1*' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
$ErrorActionPreference = $prevEa

$unlock = Join-Path $env:TEMP 'studyflow-lock.unlock'
$shield = Join-Path $env:TEMP 'studyflow-shield.on'
Set-Content -Path $unlock -Value '1' -Encoding ASCII -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 300
Remove-Item $unlock, $shield -Force -ErrorAction SilentlyContinue

# 5) Logon watcher task (keeps hook alive if Chrome message is delayed)
$taskName = 'StudyFlowLockWatcher'
$watcherArgs = "--watch"
$action = New-ScheduledTaskAction -Execute $hostExe -Argument $watcherArgs -WorkingDirectory $destDir
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
try {
  Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
  Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null
  Write-Host "Scheduled task: $taskName (backup watcher)"
} catch {
  Write-Host "Note: Could not register watcher task (optional): $($_.Exception.Message)"
}

Write-Host ''
Write-Host "SUCCESS"
Write-Host "  Host: $hostExe"
Write-Host "  Manifest: $manifestPath"
Write-Host "  Extension ID: $ExtensionId"
Write-Host ''
Write-Host 'Next:'
Write-Host '  1. chrome://extensions → Reload StudyFlow'
Write-Host '  2. StudyFlow → Block → Check connection'
Write-Host '  3. Start focus session → Alt+Tab should be BLOCKED'
Write-Host ''
if ($Host.Name -eq 'ConsoleHost') { Read-Host 'Press Enter to close' }
