@echo off
echo ====================================
echo  Starting Badminton AI Dev Servers
echo ====================================

:: Kill any existing node on ports 3000 and 5173
echo.
echo Killing old processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 :5173" ^| findstr LISTENING') do (
    taskkill /PID %%a /F >nul 2>&1
)

:: Start Backend
echo.
echo Starting Backend (port 3000)...
cd /d F:\ClaudeWorkspace\DO AN 1\backend
start "Backend Server" cmd /k "npm run dev"

:: Wait 3 seconds then start Frontend
timeout /t 3 /nobreak >nul

:: Start Frontend
echo Starting Frontend (port 5173)...
cd /d F:\ClaudeWorkspace\DO AN 1\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ====================================
echo  DONE! Open http://localhost:5173
echo ====================================
pause
