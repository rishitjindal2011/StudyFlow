# StudyFlow — push to GitHub (run from this folder in PowerShell)
$ErrorActionPreference = "Stop"
$git = "C:\Program Files\Git\cmd\git.exe"
if (-not (Test-Path $git)) {
    Write-Error "Git not found. Install from https://git-scm.com/download/win"
}
$repo = $PSScriptRoot
$env:Path = "C:\Program Files\Git\cmd;" + $env:Path

Write-Host "Repo: $repo" -ForegroundColor Cyan
& $git -C $repo status

$ahead = & $git -C $repo rev-list --count origin/main..main 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "First push — setting upstream..." -ForegroundColor Yellow
    & $git -C $repo push -u origin main
} elseif ([int]$ahead -gt 0) {
    Write-Host "Pushing $ahead commit(s) to origin/main..." -ForegroundColor Cyan
    & $git -C $repo push origin main
} else {
    Write-Host "Already up to date with GitHub." -ForegroundColor Green
    & $git -C $repo push origin main
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "Done: https://github.com/rishitjindal2011/StudyFlow" -ForegroundColor Green
}
