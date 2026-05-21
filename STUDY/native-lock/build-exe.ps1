# Build StudyFlow-Lock-Setup.exe — bundles StudyFlowLockHost (the only host Chrome needs)
$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $dir

function Require-Py {
  foreach ($cmd in @('py', 'python')) {
    if (Get-Command $cmd -ErrorAction SilentlyContinue) {
      & $cmd -3 -c "import sys" 2>$null | Out-Null
      if ($LASTEXITCODE -eq 0) { return $cmd }
      & $cmd -c "import sys" 2>$null | Out-Null
      if ($LASTEXITCODE -eq 0) { return $cmd }
    }
  }
  Write-Error 'Python 3 not found. Install from https://www.python.org/downloads/'
}

$py = Require-Py
Write-Host "Using: $py"
$ErrorActionPreference = 'Continue'
& $py -3 -m pip install --upgrade pip pyinstaller 2>$null
if ($LASTEXITCODE -ne 0) { & $py -m pip install --upgrade pip pyinstaller 2>$null }
$ErrorActionPreference = 'Stop'

# C# host (Alt+Tab hook + native messaging)
Write-Host 'Compiling StudyFlowLockHost.exe ...'
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $dir 'Compile-StudyFlowLock.ps1')
if (-not (Test-Path (Join-Path $dir 'StudyFlowLockHost.exe'))) {
  Write-Error 'StudyFlowLockHost.exe build failed'
}

$dist = Join-Path $dir 'dist'
$bundle = Join-Path $dir 'dist-bundle'
if (Test-Path $dist) { Remove-Item $dist -Recurse -Force }
if (Test-Path $bundle) { Remove-Item $bundle -Recurse -Force }

New-Item -ItemType Directory -Path $bundle -Force | Out-Null
Copy-Item (Join-Path $dir 'StudyFlowLockHost.exe') $bundle -Force
Copy-Item (Join-Path $dir 'StudyFlowLockHost.cs') $bundle -Force
Copy-Item (Join-Path $dir 'unlock-now.bat') $bundle -Force -ErrorAction SilentlyContinue

Write-Host 'Building StudyFlow-Lock-Setup.exe ...'
$addExe = Join-Path $bundle 'StudyFlowLockHost.exe'
$addCs = Join-Path $bundle 'StudyFlowLockHost.cs'
$addUnlock = Join-Path $bundle 'unlock-now.bat'
$dataArgs = @(
  "--add-data", "$addExe;.",
  "--add-data", "$addCs;."
)
if (Test-Path $addUnlock) {
  $dataArgs += @("--add-data", "$addUnlock;.")
}

& $py -3 -m PyInstaller --noconfirm --clean --onefile `
  --name StudyFlow-Lock-Setup `
  @dataArgs `
  setup_installer.py
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$setupExe = Join-Path $dist 'StudyFlow-Lock-Setup.exe'
$extRoot = Join-Path (Split-Path $dir -Parent) 'StudyFlow-Lock-Setup.exe'
Copy-Item $setupExe $extRoot -Force
Copy-Item (Join-Path $dir 'StudyFlowLockHost.exe') (Join-Path (Split-Path $dir -Parent) 'native-lock\StudyFlowLockHost.exe') -Force -ErrorAction SilentlyContinue

Write-Host ''
Write-Host 'Done:'
Write-Host "  Setup:  $setupExe"
Write-Host "  Copied: $extRoot"
Write-Host 'Reload the StudyFlow extension after replacing StudyFlow-Lock-Setup.exe'
