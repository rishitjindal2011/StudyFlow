@echo off
title Uninstall StudyFlow PC Lock
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Uninstall-StudyFlow-Lock.ps1"
pause
