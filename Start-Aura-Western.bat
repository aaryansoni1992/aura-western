@echo off
title Aura Western - Store Launcher
cd /d "%~dp0"
cls
echo ========================================================
echo               AURA WESTERN STOREFRONT
echo ========================================================
echo.
echo  [1/2] Initializing Aura Western dev server...
echo        - Frontend:  http://localhost:5173/
echo        - Backend:   http://localhost:5000/
echo.
echo  [2/2] Opening storefront in your default browser...
echo.
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5173/"
call npm run dev
if %errorlevel% neq 0 (
  echo.
  echo [ERROR] Dev server encountered an issue. Starting backup preview server...
  start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5173/"
  call npm run preview
)
pause
