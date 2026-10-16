@echo off
title Aura Western - Store Launcher
cls
echo ========================================================
echo               AURA WESTERN STOREFRONT
echo ========================================================
echo.
echo  Starting local development servers on:
echo  - Frontend: http://localhost:5173/
echo  - Backend API: http://localhost:5000/
echo.
echo  Opening storefront in your default browser...
echo.
start http://localhost:5173/
cd /d "%~dp0"
npm run dev
pause
