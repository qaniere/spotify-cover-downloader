const { app, BrowserWindow } = require('electron')

try {
    require('electron-reloader')(module)
  } catch (_) {} //For dev purposes only

function createWindow () {
  const win = new BrowserWindow({
    width: 700,
    height: 700,
    webPreferences: {
      resizable: false,
      fullscreen: false,
      nodeIntegration: true
    }
  })
  win.setMenuBarVisibility(false)
  win.loadFile('src/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})