const fs = require('fs');
const https = require('https');
const { app, BrowserWindow, ipcMain, dialog} = require('electron');


function createWindow () {

    const win = new BrowserWindow({
        width: 700,
        height: 700,
        show: false,
        resizable: false,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.setMenuBarVisibility(false);
    win.loadFile('src/index.html');
    win.setIcon('src/img/icon.png');
    win.once('ready-to-show', function(){
        win.show();
    })
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
    app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})
