@ECHO OFF
set version=%1
:againversion
IF "%1" == "" set /p version=Publish Version (v1)? 
for %%I in (.) do set folder=%%~nxI
set imagePath=registry.trabilisim.com/%folder%:%version%
ECHO ============================
ECHO IMAGE PATH [%imagePath%]
ECHO ============================
:again
set /p answer=Do you want to create it now (Y/N)? 
if /i "%answer:~,1%" EQU "Y" goto build
if /i "%answer:~,1%" EQU "N" exit /b
echo Please type Y for Yes or N for No
goto again
:build
ECHO ============================
ECHO BUILD START
ECHO ============================
docker build -t "%imagePath%" .
ECHO ============================
ECHO PUSH START
ECHO ============================
docker push "%imagePath%"
pause