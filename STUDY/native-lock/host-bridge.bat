@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -Sta -File "%~dp0host-bridge.ps1"
