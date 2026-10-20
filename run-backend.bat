@echo off
REM EcoBug backend launcher (double-click this)
REM Requires: Java 17+, Maven on PATH, Backend\.env filled in
cd /d "%~dp0Backend"

REM Load Backend\.env into the environment for this window
if exist .env (
  for /f "usebackq tokens=1* delims==" %%A in (".env") do (
    if not "%%A"=="" (
      set "line=%%A"
      if not "%%B"=="" set "%%A=%%B"
    )
  )
)

echo Starting Spring Boot on http://localhost:8080 ...
mvn -o -DskipTests -Dmaven.test.skip=true -Dmaven.javadoc.skip=true spring-boot:run
pause
