@echo off
cd /d "%~dp0"
where py >nul 2>&1 && py -3 "%~dp0host.py" %* && exit /b %errorlevel%
where python >nul 2>&1 && python "%~dp0host.py" %* && exit /b %errorlevel%
echo Python not found. Install from https://www.python.org/downloads/ >> "%TEMP%\studyflow-lock.log"
exit /b 1
