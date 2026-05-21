@echo off
title StudyFlow - Unlock Alt+Tab NOW
echo.
echo  Unlocking Alt+Tab / Win+Tab...
echo.

echo unlock> "%TEMP%\studyflow-lock.unlock"
if exist "%TEMP%\studyflow-shield.on" del "%TEMP%\studyflow-shield.on" >nul 2>&1

taskkill /IM StudyFlowLockHost.exe /F /T >nul 2>&1
taskkill /IM studyflow-lock-daemon.exe /F /T >nul 2>&1
taskkill /IM studyflow-lock-host.exe /F /T >nul 2>&1

powershell -NoProfile -Command ^
  "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*StudyFlowLock*' -or $_.CommandLine -like '*lock-daemon*' -or $_.CommandLine -like '*studyflow-lock*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }" >nul 2>&1

del "%TEMP%\studyflow-lock.pid" >nul 2>&1
del "%TEMP%\studyflow-lock.unlock" >nul 2>&1

echo.
echo  Done. Try Alt+Tab now.
echo.
pause
