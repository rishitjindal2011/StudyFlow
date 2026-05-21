@echo off
title StudyFlow Lock Setup
cd /d "%~dp0"
echo.
echo  StudyFlow Lock for Windows (one-time setup)
echo  ==========================================
echo.
echo  Get your Extension ID from StudyFlow - Block tab - Copy extension ID
echo  (or chrome://extensions - StudyFlow - ID)
echo.
set /p EXTID=Paste Extension ID here, then press Enter: 
if "%EXTID%"=="" (
  echo No ID entered. Exiting.
  pause
  exit /b 1
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-user.ps1" -ExtensionId "%EXTID%"
echo.
pause
