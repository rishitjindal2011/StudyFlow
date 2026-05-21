# Chrome native messaging host (PowerShell) — no Python / no old .exe required
$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$logPath = Join-Path $env:TEMP 'studyflow-lock.log'
$unlockFlag = Join-Path $env:TEMP 'studyflow-lock.unlock'
$pidFile = Join-Path $env:TEMP 'studyflow-lock.pid'
$daemonPs1 = Join-Path $dir 'lock-daemon.ps1'
$daemonExe = Join-Path $dir 'studyflow-lock-daemon.exe'

function Write-Log($msg) {
  try { Add-Content -Path $logPath -Value $msg -Encoding UTF8 } catch {}
}

function Read-Message {
  $stdin = [Console]::OpenStandardInput()
  $lenBuf = New-Object byte[] 4
  $read = $stdin.Read($lenBuf, 0, 4)
  if ($read -lt 4) { return $null }
  $len = [BitConverter]::ToUInt32($lenBuf, 0)
  if ($len -le 0) { return $null }
  $buf = New-Object byte[] $len
  $offset = 0
  while ($offset -lt $len) {
    $n = $stdin.Read($buf, $offset, $len - $offset)
    if ($n -le 0) { return $null }
    $offset += $n
  }
  return [Text.Encoding]::UTF8.GetString($buf) | ConvertFrom-Json
}

function Write-Message($obj) {
  $json = ($obj | ConvertTo-Json -Compress -Depth 6)
  $bytes = [Text.Encoding]::UTF8.GetBytes($json)
  $len = [BitConverter]::GetBytes([uint32]$bytes.Length)
  $stdout = [Console]::OpenStandardOutput()
  $stdout.Write($len, 0, 4)
  $stdout.Write($bytes, 0, $bytes.Length)
  $stdout.Flush()
}

function Test-DaemonAlive {
  if (-not (Test-Path $pidFile)) { return $false }
  try {
    $pidVal = [int](Get-Content $pidFile -Raw).Trim()
    return $null -ne (Get-Process -Id $pidVal -ErrorAction SilentlyContinue)
  } catch { return $false }
}

function Stop-Daemons {
  $shield = Join-Path $env:TEMP 'studyflow-shield.on'
  if (Test-Path $shield) { Remove-Item $shield -Force -ErrorAction SilentlyContinue }
  if (Test-Path $unlockFlag) { Remove-Item $unlockFlag -Force -ErrorAction SilentlyContinue }
  Set-Content -Path $unlockFlag -Value '1' -Encoding ASCII -ErrorAction SilentlyContinue
  Start-Sleep -Milliseconds 350
  foreach ($img in @('studyflow-lock-daemon.exe', 'StudyFlowLockHost.exe')) {
    taskkill /IM $img /F /T 2>$null | Out-Null
  }
  Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like '*lock-daemon.ps1*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  if (Test-Path $pidFile) { Remove-Item $pidFile -Force -ErrorAction SilentlyContinue }
  if (Test-Path $unlockFlag) { Remove-Item $unlockFlag -Force -ErrorAction SilentlyContinue }
}

function Start-Daemon {
  Stop-Daemons
  Start-Sleep -Milliseconds 200
  $csharpHost = Join-Path $dir 'StudyFlowLockHost.exe'
  if (Test-Path $csharpHost) {
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $csharpHost
    $psi.Arguments = '--hook'
    $psi.WorkingDirectory = $dir
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true
    $p = [Diagnostics.Process]::Start($psi)
    Start-Sleep -Milliseconds 800
    if ($p.HasExited) {
      Write-Log "csharp --hook exited code=$($p.ExitCode)"
      return $false, 'csharp_hook_failed'
    }
    Set-Content -Path (Join-Path $env:TEMP 'studyflow-shield.on') -Value '1' -Encoding ASCII -NoNewline -ErrorAction SilentlyContinue
    Set-Content -Path $pidFile -Value $p.Id -Encoding ASCII -NoNewline
    Write-Log "lock_on csharp --hook pid=$($p.Id)"
    return $true, "locked_pid_$($p.Id)"
  }
  if (Test-Path $daemonPs1) {
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = 'powershell.exe'
    $psi.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$daemonPs1`""
    $psi.WorkingDirectory = $dir
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true
    $p = [Diagnostics.Process]::Start($psi)
    Start-Sleep -Milliseconds 600
    if ($p.HasExited) {
      Write-Log "daemon ps1 exited code=$($p.ExitCode)"
      return $false, 'daemon_ps1_failed'
    }
    Set-Content -Path $pidFile -Value $p.Id -Encoding ASCII -NoNewline
    Write-Log "lock_on ps1 pid=$($p.Id)"
    return $true, "locked_pid_$($p.Id)"
  }
  if (Test-Path $daemonExe) {
    $p = Start-Process -FilePath $daemonExe -WorkingDirectory $dir -WindowStyle Hidden -PassThru
    Start-Sleep -Milliseconds 600
    if ($p.HasExited) {
      Write-Log "daemon exe exited code=$($p.ExitCode)"
      return $false, 'daemon_exe_failed'
    }
    Set-Content -Path $pidFile -Value $p.Id -Encoding ASCII -NoNewline
    return $true, "locked_pid_$($p.Id)"
  }
  return $false, 'missing lock-daemon.ps1'
}

while ($true) {
  $msg = Read-Message
  if ($null -eq $msg) { break }
  $cmd = ([string]$msg.cmd).ToUpper()
  switch ($cmd) {
    'PING' {
      Write-Message @{ ok = $true; pong = $true; locked = (Test-DaemonAlive) }
    }
    'LOCK_ON' {
      $ok, $detail = Start-Daemon
      Write-Message @{ ok = $ok; detail = $detail; locked = $ok }
    }
    'LOCK_OFF' {
      Stop-Daemons
      Write-Message @{ ok = $true; detail = 'unlocked'; locked = $false }
    }
    default {
      Write-Message @{ ok = $false; error = 'unknown_cmd' }
    }
  }
}
