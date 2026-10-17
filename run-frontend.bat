@echo off
REM EcoBug frontend launcher (double-click this)
REM Requires: Node 20+ on PATH
cd /d "%~dp0Frontend"

if not exist node_modules (
  echo Installing frontend dependencies (first run only)...
  call npm install --no-audit --no-fund
)

echo Starting Next.js on http://localhost:3000 ...
call npm run dev
pause
