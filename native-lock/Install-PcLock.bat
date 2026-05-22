@echo off
title StudyFlow PC Lock - Quick Install
cd /d "%~dp0"
set /p EID="Paste StudyFlow Extension ID (32 chars from Block tab): "
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Install-PcLock.ps1" -ExtensionId "%EID%"
pause
