const { ipcRenderer } = require('electron')

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log("message :")
    console.log(arg)
  })
  ipcRenderer.send('asynchronous-message', 'ping')


MicroModal.init();

if(!localStorage.getItem('firstTimeRunningApp')) {
    localStorage.setItem("firstTimeRunningApp", false) 
    MicroModal.show("modal-welcome");
}

document.getElementById("start").addEventListener("click", function() {
    MicroModal.close("modal-welcome");
});