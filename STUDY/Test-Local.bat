@echo off
title StudyFlow - Local test menu
cd /d "%~dp0"

:menu
cls
echo.
echo   StudyFlow - LOCAL TEST
echo   ====================
echo.
echo   1) Open website home page (download page)
echo   2) Open web app in browser (studyflow.html)
echo   3) Run desktop app - portable (no install)
echo   4) Run desktop app - installed copy
echo   5) Run Windows INSTALLER (StudyFlow-Setup)
echo   6) Start dev mode (npm start - for developers)
echo   7) Serve site on http://localhost:3333
echo   Q) Quit
echo.
set /p choice=Choose 1-7 or Q:

if /i "%choice%"=="1" start "" "%~dp0index.html"
if /i "%choice%"=="2" start "" "%~dp0studyflow.html"
if /i "%choice%"=="3" (
  if exist "%~dp0desktop\dist\StudyFlow-App.exe" (
    start "" "%~dp0desktop\dist\StudyFlow-App.exe"
  ) else (
    echo Build first: cd desktop ^& Build-Desktop.ps1
    pause
  )
)
if /i "%choice%"=="4" (
  if exist "%LOCALAPPDATA%\Programs\StudyFlow\StudyFlow.exe" (
    start "" "%LOCALAPPDATA%\Programs\StudyFlow\StudyFlow.exe"
  ) else (
    echo Not installed yet. Use option 5 first.
    pause
  )
)
if /i "%choice%"=="5" (
  if exist "%~dp0desktop\dist\StudyFlow-Setup-1.0.0.exe" (
    start "" "%~dp0desktop\dist\StudyFlow-Setup-1.0.0.exe"
  ) else (
    echo Missing installer. Run: cd desktop ^& Build-Desktop.ps1
    pause
  )
)
if /i "%choice%"=="6" (
  cd /d "%~dp0desktop"
  call npm start
)
if /i "%choice%"=="7" (
  echo Opening http://localhost:3333 ...
  start "" "http://localhost:3333/"
  cd /d "%~dp0"
  npx --yes serve -l 3333
)
if /i "%choice%"=="Q" exit /b 0
goto menu
