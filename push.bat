@echo off
set msg=%*
if "%msg%"=="" set msg=update: 自动同步代码

echo ===== 自动提交并推送 =====
git add .
git commit -m "%msg%"
git push

echo.
echo ✅ 推送完成！
pause