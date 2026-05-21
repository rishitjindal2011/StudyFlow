@echo off
set "APP=%~dp0desktop\dist\StudyFlow-App.exe"
if exist "%APP%" (
  start "" "%APP%"
  exit /b 0
)
set "DEV=%~dp0desktop\dist\win-unpacked\StudyFlow.exe"
if exist "%DEV%" (
  start "" "%DEV%"
  exit /b 0
)
echo Build the app first:  cd desktop  ^&  Build-Desktop.ps1
pause
