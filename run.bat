@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   Iniciando Narrativa Politica
echo ============================================
echo.

:: Verifica se o Node.js esta instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado no seu sistema!
    echo Por favor, instale o arquivo "node-v24.14.1-x64.msi" que esta nos seus Downloads.
    pause
    exit /b
)

:: Verifica se a pasta node_modules existe
if not exist "node_modules" (
    echo [INFO] Instalando dependencias do projeto pela primeira vez...
    call npm install
)

echo [OK] Abrindo o servidor e o site no seu navegador...
echo.

:: Inicia o servidor e abre o navegador
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [ERRO] O servidor nao conseguiu iniciar corretamente.
    echo Tente abrir o arquivo "index_simples.html" para ver o site sem o servidor.
)

pause
