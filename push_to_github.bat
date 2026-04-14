@echo off
echo =======================================
echo PUSHING TO GITHUB: ragsree543-bit/gencoft
echo =======================================
cd /d "%~dp0"

git config user.name "ragsree543"
git config user.email "ragsree543@gmail.com"

git init
git remote remove origin 2>nul
git remote add origin https://github.com/ragsree543-bit/gencoft-.git
git branch -M main

git add .
git commit -m "Redesign: soft pastel gradient background with purple/pink theme"
git push -u origin main

echo =======================================
echo DONE! Check your live website now.
echo =======================================
pause
