@echo off
title Dori V13
color 07
:node
echo Encendido: %DATE% (%TIME%) >> log.txt
node index.js
echo Apagado: %DATE% (%TIME%) >> log.txt
echo ---------------------------------------------------------- >> log.txt
color 07
goto node