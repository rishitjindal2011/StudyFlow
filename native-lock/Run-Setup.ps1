# Same as StudyFlow-Lock-Setup.exe — installs StudyFlowLockHost.exe + Chrome registry (no Python)
param([string]$ExtensionId = '')

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$dest = Join-Path $env:LOCALAPPDATA 'StudyFlow\pc-lock'
$hostExe = Join-Path $dest 'StudyFlowLockHost.exe'
$manifest = Join-Path $dest 'com.studyflow.lock.installed.json'

function Get-Csc {
  $roots = @(
    "${env:WINDIR}\Microsoft.NET\Framework64\v4.0.30319\csc.exe",
    "${env:WINDIR}\Microsoft.NET\Framework\v4.0.30319\csc.exe"
  )
  $roots | Where-Object { Test-Path $_ } | Select-Object -First 1
}

function Ensure-HostExe {
  New-Item -ItemType Directory -Path $dest -Force | Out-Null
  $bundledExe = Join-Path $here 'StudyFlowLockHost.exe'
  $bundledCs = Join-Path $here 'StudyFlowLockHost.cs'
  if (Test-Path $bundledExe) {
    Copy-Item $bundledExe $hostExe -Force
    return
  }
  if (-not (Test-Path $bundledCs)) {
    throw "Missing StudyFlowLockHost.exe next to this installer."
  }
  $csc = Get-Csc
  if (-not $csc) { throw '.NET Framework csc.exe not found' }
  & $csc /nologo /target:winexe /optimize+ "/out:$hostExe" `
    /reference:System.dll /reference:System.Windows.Forms.dll /reference:System.Drawing.dll `
    $bundledCs
  if (-not (Test-Path $hostExe)) { throw 'Compile failed' }
}

function Get-ExtensionId {
  if ($ExtensionId -match '^[a-p]{32}$') { return $ExtensionId.Trim().ToLower() }
  foreach ($p in @(
    (Join-Path $here 'studyflow-lock.id'),
    (Join-Path $env:USERPROFILE 'Downloads\studyflow-lock.id')
  )) {
    if (Test-Path $p) {
      $id = (Get-Content $p -Raw).Trim().ToLower()
      if ($id -match '^[a-p]{32}$') { return $id }
    }
  }
  try {
    Add-Type -AssemblyName System.Windows.Forms
    $id = [Windows.Forms.Clipboard]::GetText().Trim().ToLower()
    if ($id -match '^[a-p]{32}$') { return $id }
  } catch {}
  return (Read-Host 'Paste StudyFlow Extension ID (Block tab)')
}

$id = Get-ExtensionId
if ($id -notmatch '^[a-p]{32}$') { throw 'Invalid extension ID' }

Ensure-HostExe

@{
  name            = 'com.studyflow.lock'
  description     = 'StudyFlow PC lock'
  path            = $hostExe
  type            = 'stdio'
  allowed_origins = @("chrome-extension://$id/")
} | ConvertTo-Json -Depth 4 | Set-Content -Path $manifest -Encoding UTF8

$reg = 'HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.studyflow.lock'
New-Item -Path $reg -Force | Out-Null
Set-ItemProperty -Path $reg -Name '(default)' -Value $manifest

# Watcher task (backup)
try {
  Unregister-ScheduledTask -TaskName 'StudyFlowLockWatcher' -Confirm:$false -ErrorAction SilentlyContinue
  $a = New-ScheduledTaskAction -Execute $hostExe -Argument '--watch' -WorkingDirectory $dest
  $tr = New-ScheduledTaskTrigger -AtLogOn
  Register-ScheduledTask -TaskName 'StudyFlowLockWatcher' -Action $a -Trigger $tr -Force | Out-Null
} catch {}

Write-Host ''
Write-Host 'StudyFlow PC Lock installed.'
Write-Host "  $hostExe"
Write-Host "  Extension: $id"
Write-Host ''
Write-Host 'Reload StudyFlow, Check connection, start focus session.'
