#!/bin/bash
if [ ! -d "logs" ]; then
    mkdir "logs"
fi
if [ ! -d "node_modules" ]; then
   npm install > logs/install-logs.txt
fi
node . 1>logs/logs.txt 2>logs/error-logs.txt
