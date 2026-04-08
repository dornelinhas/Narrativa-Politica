@echo off
cd /d "%~dp0"
echo Iniciando Narrativa Politica...
echo.

:: Verifica se o Node.js esta instalado
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o arquivo "node-v24.14.1-x64.msi" que esta nos seus Downloads.
    pause
    exit /b
)

if not exist node_modules (
    echo Instalando dependencias (isso pode levar um minuto)...
    call npm install
)

echo.
echo Servidor iniciando...
echo O site abrira automaticamente no seu navegador padrao.
echo.

call npm run dev
pause
