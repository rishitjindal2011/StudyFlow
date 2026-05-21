@echo off
title StudyFlow Lock Repair
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Repair-StudyFlow-Lock.ps1"
pause
