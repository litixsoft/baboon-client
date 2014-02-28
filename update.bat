@echo OFF
echo Module werden geloescht und neu installiert

if exist node_modules rd /s /q node_modules
if exist bower_components rd /s /q bower_components

call npm install
call bower install

echo Module geloescht und neu installiert
pause
