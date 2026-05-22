$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $dir

& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $dir 'Compile-StudyFlowLock.ps1')
$hostExe = Join-Path $dir 'StudyFlowLockHost.exe'
$hostCs = Join-Path $dir 'StudyFlowLockHost.cs'
if (-not (Test-Path $hostExe)) { throw 'StudyFlowLockHost.exe missing' }

$csc = @(
  "${env:WINDIR}\Microsoft.NET\Framework64\v4.0.30319\csc.exe",
  "${env:WINDIR}\Microsoft.NET\Framework\v4.0.30319\csc.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $csc) { throw 'csc.exe not found' }

$setupOut = Join-Path $dir 'StudyFlow-Lock-Setup.exe'
& $csc /nologo /target:winexe /optimize+ "/out:$setupOut" `
  /reference:System.dll /reference:System.Windows.Forms.dll /reference:System.Drawing.dll `
  "/resource:$hostExe,StudyFlowLockHost.exe" `
  "/resource:$hostCs,StudyFlowLockHost.cs" `
  (Join-Path $dir 'StudyFlow-Lock-Setup.cs')

Copy-Item $setupOut (Join-Path (Split-Path $dir -Parent) 'StudyFlow-Lock-Setup.exe') -Force
Write-Host "Built: $setupOut"
