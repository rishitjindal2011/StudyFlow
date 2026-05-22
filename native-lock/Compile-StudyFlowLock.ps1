# Builds StudyFlowLockHost.exe (C# — Chrome native messaging + Alt+Tab hook)
$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$src = Join-Path $dir 'StudyFlowLockHost.cs'
$out = Join-Path $dir 'StudyFlowLockHost.exe'
$dest = Join-Path $env:LOCALAPPDATA 'StudyFlow\pc-lock\StudyFlowLockHost.exe'

if (-not (Test-Path $src)) { throw "Missing $src" }

$cscPaths = @(
  "${env:WINDIR}\Microsoft.NET\Framework64\v4.0.30319\csc.exe",
  "${env:WINDIR}\Microsoft.NET\Framework\v4.0.30319\csc.exe"
)
$csc = $cscPaths | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $csc) { throw 'C# compiler (csc.exe) not found — install .NET Framework' }

$refs = @(
  '/reference:System.dll',
  '/reference:System.Windows.Forms.dll',
  '/reference:System.Drawing.dll'
)

& $csc /nologo /target:winexe /optimize+ /out:$out $refs $src
if ($LASTEXITCODE -ne 0) { throw "csc failed with code $LASTEXITCODE" }

Write-Host "Built: $out"

if (Test-Path (Split-Path $dest -Parent)) {
  Copy-Item $out $dest -Force
  Write-Host "Copied to: $dest"
}
