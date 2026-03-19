@echo off
echo Starting Teesri Kasam Shilpkar Interactive Lesson...
echo.
echo Starting server on http://localhost:3001
echo Opening browser in 3 seconds...
echo.

REM Start the server in the background
start /B node simple_server.js

REM Wait a few seconds for server to start
timeout /t 3 /nobreak >nul

REM Open the browser
start http://localhost:3001

echo.
echo Server is running! Press Ctrl+C to stop.
echo If browser didn't open, go to: http://localhost:3001
pause
