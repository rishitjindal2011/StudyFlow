# Builds StudyFlow-Setup-1.0.0.exe (embedded app — website download installer)
$ErrorActionPreference = 'Stop'
$desktopDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$distDir = Join-Path $desktopDir 'dist'
$unpacked = Join-Path $distDir 'win-unpacked'
$zipPath = Join-Path $desktopDir 'installer\StudyFlowApp.zip'
$setupOut = Join-Path $distDir 'StudyFlow-Setup-1.0.0.exe'
$setupCs = Join-Path $desktopDir 'installer\StudyFlow-Setup.cs'

# Read version from package.json
$pkg = Get-Content (Join-Path $desktopDir 'package.json') -Raw | ConvertFrom-Json
$ver = $pkg.version
$setupOut = Join-Path $distDir "StudyFlow-Setup-$ver.exe"

if (-not (Test-Path $unpacked)) {
  throw "Missing $unpacked - run npm run dist:portable or Build-Desktop.ps1 first"
}
if (-not (Test-Path (Join-Path $unpacked 'StudyFlow.exe'))) {
  throw 'win-unpacked\StudyFlow.exe missing'
}

Write-Host 'Creating app bundle zip...' -ForegroundColor Cyan
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$zipTemp = Join-Path $env:TEMP "studyflow-pkg-$([guid]::NewGuid().ToString('N')).zip"
Compress-Archive -Path (Join-Path $unpacked '*') -DestinationPath $zipTemp -Force
New-Item -ItemType Directory -Force -Path (Split-Path $zipPath -Parent) | Out-Null
Move-Item $zipTemp $zipPath -Force

$cscPaths = @(
  "${env:WINDIR}\Microsoft.NET\Framework64\v4.0.30319\csc.exe",
  "${env:WINDIR}\Microsoft.NET\Framework\v4.0.30319\csc.exe"
)
$csc = $cscPaths | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $csc) { throw 'csc.exe not found (.NET Framework required)' }

Write-Host 'Compiling StudyFlow-Setup.exe ...' -ForegroundColor Cyan
& $csc /nologo /target:winexe /optimize+ "/out:$setupOut" `
  /reference:System.dll `
  /reference:System.Windows.Forms.dll `
  /reference:System.Drawing.dll `
  /reference:System.IO.Compression.FileSystem.dll `
  "/resource:$zipPath,StudyFlowApp.zip" `
  $setupCs

if ($LASTEXITCODE -ne 0) { throw "csc failed with code $LASTEXITCODE" }

Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
$item = Get-Item $setupOut
Write-Host ('Built installer: {0} ({1:N1} MB)' -f $item.FullName, ($item.Length / 1MB)) -ForegroundColor Green

# Keep site-config in sync hint
$siteConfig = Join-Path (Split-Path $desktopDir -Parent) 'site-config.js'
if (Test-Path $siteConfig) {
  Write-Host "Upload to GitHub Releases as: StudyFlow-Setup-$ver.exe"
  Write-Host "Update STUDY/site-config.js installerFile if needed."
}
