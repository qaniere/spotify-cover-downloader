const fs = require('fs');
const temp = require("temp");
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

var coverDownload = function(coverURL, path, event){

    https.request(coverURL, function(response) {    

        var stream = temp.createWriteStream();                                            
        response.on('data', function(chunk) {                                       
            stream.write(chunk);                                                         
        });                                                                         
  
        response.on('end', function() {                                             
            stream.end();
            var coverPath = stream.path;      

            fs.rename(coverPath, coverPath + '.jpg', () => {
                event.reply('cover-ready', coverPath += '.jpg');
                fs.createReadStream(coverPath).pipe(fs.createWriteStream(path));
            });        
        });                                                                          
    }).end();
    
  };


ipcMain.on('ask-download', (event, url) => {

    if(!url.includes('https://open.spotify.com')) {
        event.reply('invalid-url');

    } else {

        var requestOptions = {
            host: 'open.spotify.com',
            port: 443,
            path: path = url.replace('https://open.spotify.com', ''),
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': "Mozilla/5.0"
            }
        };

        https.request(requestOptions, (res) => {

            var str = '';
            res.on('data', function(chunk) {
                str += chunk;
            });

            res.on('end', function () {

                let html = str.split('\n');
                for(i = 0; i < html.length ; i++) {

                    if(html[i].includes("<meta property=\"og:image\"")) {
                        let head = html[i].split("<");
                        for(i = 0; i < head.length; i++) {

                            if(head[i].includes("meta property=\"og:image\"")) {
                                var coverUrl = head[i].replace("meta property=\"og:image\" content=\"", "")
                                coverUrl = coverUrl.replace("\" />", "");

                                let saveOptions = {
                                    title: 'Save your cover',                                    
                                    filters :[
                                     {name: 'JPG image', extensions: ['jpg']},
                                    ]
                                };
                                dialog.showSaveDialog(saveOptions).then((fileInfo) => {
                                    
                                    if(!fileInfo["canceled"]) {
                                        coverDownload(coverUrl, fileInfo["filePath"], event);
                                    }   
                                });
                            }
                        }
                    }
                } 
            });
        }).end();
    }
});
