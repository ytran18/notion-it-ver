const electron = require('electron');
const app = electron.app;
const screen = electron.screen;
const BrowserWindow = electron.BrowserWindow;

let win;

function createWindow() {
    let { width, height } = screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
        width: width, 
        height: height, 
        minWidth: 742, minHeight:475,
        titleBarStyle: 'hidden',
    });

    win.loadURL('http://localhost:3000');

    win.webContents.openDevTools();

    win.on('close', function() {
        win = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    app.quit();
});

app.on('activate', function() {
    if(win == null) {
        createWindow();
    }
})
