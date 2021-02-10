const { app, BrowserWindow, ipcMain } = require('electron');

try {
    require('electron-reloader')(module);
  } catch (_) {} //For dev purposes only

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
    win.show()
    win.webContents.openDevTools()
  })
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log("message :")
  console.log(arg) 
  event.reply('asynchronous-reply', 'pong')
})
