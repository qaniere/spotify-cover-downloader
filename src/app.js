const { ipcRenderer } = require('electron')
MicroModal.init();

var logoIsVisible = true;
var urlBar = document.getElementById('urlBar');

ipcRenderer.on('download-complete', (event, arg) => {
    console.log('Download is complete');
});

ipcRenderer.on('invalid-url', (event, arg) => {
    MicroModal.show('modal-invalid-url');
});

ipcRenderer.on('cover-ready', (event, arg) => {

    if(logoIsVisible) {
        document.getElementById('spotifyIcon').remove();
        logoIsVisible = false;
    }

    document.getElementById('cover').src = arg;
    document.getElementById('cover').style.visibility = "visible";
});

if(!localStorage.getItem('firstTimeRunningApp')) {
    localStorage.setItem('firstTimeRunningApp', false);
    MicroModal.show('modal-welcome');
};

document.getElementById('start').addEventListener('click', () => {
    MicroModal.close('modal-welcome');
});

document.getElementById('confirmation-inv-url').addEventListener('click', () => {
    MicroModal.close('modal-invalid-url');
});

document.getElementById('downloadButton').addEventListener('click', () => {
    let url = urlBar.value;
    ipcRenderer.send('ask-download', url);
});
