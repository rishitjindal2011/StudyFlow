@echo off
:: Run once as Administrator if Alt+Tab still works after normal install
cd /d "%~dp0"
echo Starting StudyFlow lock daemon as Administrator...
powershell -Command "Start-Process py -ArgumentList '-3','%~dp0lock_daemon.py' -Verb RunAs -WindowStyle Hidden"
pause
