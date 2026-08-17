@echo off
chcp 65001 >nul
cd /d "%~dp0"

if not exist "node_modules" (
  echo 第一次运行，正在安装游戏需要的文件，请稍等...
  call npm install
  if errorlevel 1 (
    echo.
    echo 安装失败。请检查网络后重新双击这个文件。
    pause
    exit /b 1
  )
)

echo 正在启动《AI 黑话世界》...
echo 浏览器会自动打开。请不要关闭这个黑色窗口。
echo 结束游戏时，回到这里按 Ctrl+C。
echo.
call npm run dev -- --open

echo.
echo 游戏服务已经停止。
pause
