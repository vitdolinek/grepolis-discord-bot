@ECHO OFF
if not exist "logs" mkdir "logs"
if not exist "node_modules" npm install > logs/install-logs.txt
node . 1>logs/logs.txt 2>logs/error-logs.txt