@echo off
echo =======================================
echo BUILDING AND PUSHING TO GITHUB
echo =======================================
cd /d "%~dp0"

echo Step 1: Installing dependencies...
call npm install

:: Organize images into the new folder
echo Organizing images...
mkdir "src\assets\images" 2>nul
move "src\assets\*.png" "src\assets\images\" 2>nul
move "src\assets\*.svg" "src\assets\images\" 2>nul
move "src\assets\*.jpg" "src\assets\images\" 2>nul

echo.
echo Step 2: Building project...
call npm run build

echo.
echo Step 3: Pushing to GitHub...
git add .
git commit -m "fix: clean project structure for vercel"
git push origin main

echo =======================================
echo DONE! Check your live website now.
echo =======================================
pause
