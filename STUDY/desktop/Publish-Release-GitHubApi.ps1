# Upload StudyFlow-Setup to GitHub Releases (no GitHub CLI required)
# Usage: $env:GITHUB_TOKEN = 'ghp_...'   then   .\Publish-Release-GitHubApi.ps1
param(
  [string]$Version = '1.0.0',
  [string]$Tag = '',
  [string]$Repo = 'rishitjindal2011/StudyFlow',
  [string]$Token = $env:GITHUB_TOKEN,
  [switch]$SkipBuild,
  [switch]$SetupOnly
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$desktopDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $Tag) { $Tag = "v$Version" }

$Token = ($Token -as [string]).Trim()
if (-not $Token) {
  Write-Host 'Set a GitHub token first (repo scope: public_repo or repo):' -ForegroundColor Yellow
  Write-Host '  $env:GITHUB_TOKEN = "ghp_your_token_here"'
  Write-Host '  .\Publish-Release-GitHubApi.ps1'
  Write-Host ''
  Write-Host 'Or upload manually: https://github.com/rishitjindal2011/StudyFlow/releases/new' -ForegroundColor Cyan
  exit 1
}

if (-not $SkipBuild) {
  & (Join-Path $desktopDir 'Build-Desktop.ps1')
}

$setup = Join-Path $desktopDir "dist\StudyFlow-Setup-$Version.exe"
$portable = Join-Path $desktopDir 'dist\StudyFlow-App.exe'
if (-not (Test-Path $setup)) { throw "Missing $setup" }

$apiHeaders = @{
  Authorization          = "Bearer $Token"
  Accept                 = 'application/vnd.github+json'
  'X-GitHub-Api-Version' = '2022-11-28'
}

Write-Host "Creating release $Tag ..." -ForegroundColor Cyan
$releaseBody = @{
  tag_name = $Tag
  name     = "StudyFlow $Version"
  body     = "StudyFlow Windows installer. Run StudyFlow-Setup-$Version.exe to install."
  draft    = $false
} | ConvertTo-Json

$release = $null
try {
  $release = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases" -Method Post -Headers $apiHeaders -Body $releaseBody -ContentType 'application/json; charset=utf-8'
} catch {
  if ($_.Exception.Response.StatusCode.value__ -eq 422) {
    Write-Host 'Release tag already exists — using existing release.' -ForegroundColor Yellow
    $release = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases/tags/$Tag" -Headers $apiHeaders
  } else { throw }
}

function Upload-Asset-Curl($filePath) {
  $fileName = [IO.Path]::GetFileName($filePath)
  $encoded = [Uri]::EscapeDataString($fileName)
  $uploadUri = "https://uploads.github.com/repos/$Repo/releases/$($release.id)/assets?name=$encoded"
  $mb = [math]::Round((Get-Item $filePath).Length / 1MB, 1)
  Write-Host "Uploading $fileName ($mb MB) via curl ..." -ForegroundColor Cyan

  $curl = Get-Command curl.exe -ErrorAction SilentlyContinue
  if (-not $curl) { return $false }

  $args = @(
    '-L', '-f', '-S', '-X', 'POST',
    '-H', "Authorization: Bearer $Token",
    '-H', 'Accept: application/vnd.github+json',
    '-H', 'Content-Type: application/octet-stream',
    '--data-binary', "@$filePath",
    '--retry', '3', '--retry-delay', '5',
    $uploadUri
  )
  & $curl.Source @args
  if ($LASTEXITCODE -ne 0) { return $false }
  return $true
}

function Upload-Asset-HttpClient($filePath) {
  $fileName = [IO.Path]::GetFileName($filePath)
  $encoded = [Uri]::EscapeDataString($fileName)
  $uploadUri = "https://uploads.github.com/repos/$Repo/releases/$($release.id)/assets?name=$encoded"
  $mb = [math]::Round((Get-Item $filePath).Length / 1MB, 1)
  Write-Host "Uploading $fileName ($mb MB) via HttpClient ..." -ForegroundColor Cyan

  $handler = [System.Net.Http.HttpClientHandler]::new()
  $client = [System.Net.Http.HttpClient]::new($handler)
  $client.Timeout = [TimeSpan]::FromHours(3)
  $client.DefaultRequestHeaders.Add('Authorization', "Bearer $Token")
  $client.DefaultRequestHeaders.Add('Accept', 'application/vnd.github+json')
  try {
    $stream = [System.IO.File]::OpenRead($filePath)
    try {
      $content = [System.Net.Http.StreamContent]::new($stream)
      $content.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::new('application/octet-stream')
      $response = $client.PostAsync($uploadUri, $content).GetAwaiter().GetResult()
      if (-not $response.IsSuccessStatusCode) {
        $body = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
        throw "HTTP $($response.StatusCode): $body"
      }
      return $true
    } finally {
      $stream.Dispose()
    }
  } finally {
    $client.Dispose()
  }
}

function Upload-Asset($filePath) {
  for ($try = 1; $try -le 3; $try++) {
    try {
      if (Upload-Asset-Curl $filePath) {
        Write-Host "  Uploaded: $([IO.Path]::GetFileName($filePath))" -ForegroundColor Green
        return
      }
      if (Upload-Asset-HttpClient $filePath) {
        Write-Host "  Uploaded: $([IO.Path]::GetFileName($filePath))" -ForegroundColor Green
        return
      }
    } catch {
      Write-Host "  Attempt $try failed: $($_.Exception.Message)" -ForegroundColor Yellow
      if ($try -lt 3) { Start-Sleep -Seconds (5 * $try) }
    }
  }
  throw "Upload failed after 3 attempts: $([IO.Path]::GetFileName($filePath))"
}

Upload-Asset $setup

if (-not $SetupOnly -and (Test-Path $portable)) {
  try {
    Upload-Asset $portable
  } catch {
    Write-Host "Portable upload failed (optional): $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host 'Website download uses StudyFlow-Setup only — you are OK.' -ForegroundColor Yellow
  }
}

Write-Host ''
Write-Host 'Done. Test this URL in your browser:' -ForegroundColor Green
Write-Host "  https://github.com/$Repo/releases/latest/download/StudyFlow-Setup-$Version.exe"
