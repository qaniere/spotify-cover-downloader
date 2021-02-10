const { ipcRenderer } = require('electron')
MicroModal.init();

var urlBar = document.getElementById("urlBar");

ipcRenderer.on('download-complete', (event, arg) => {
    console.log('Download is complete');
})

if(!localStorage.getItem('firstTimeRunningApp')) {
    localStorage.setItem('firstTimeRunningApp', false);
    MicroModal.show('modal-welcome');
}

document.getElementById('start').addEventListener('click', () => {
    MicroModal.close('modal-welcome');
});

document.getElementById('downloadButton').addEventListener('click', () => {
    let url = urlBar.value;
    ipcRenderer.send('ask-download', url);
});
