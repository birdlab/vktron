'use strict';

const electron = require('electron');
// Module to control application life.

//var AV = require('av');
//require('flac.js');


const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let player;


// In main process.
const ipcMain = require('electron').ipcMain;
ipcMain.on('asynchronous-message', function(event, arg) {
    console.log(arg);  // prints "ping"
    event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', function(event, arg) {
    console.log(arg);  // prints "ping"
    event.returnValue = 'pong';
});


let p='http://birdlab.ru/sound/flac/Linkin%20Park%20Vs.%20Jay-Z-Numb%20(Dark%20Skies%20Remix).flac';
function play(path){
    player = AV.Player.fromURL(path);
    player.play();
}



function openDialog() {
    const dialog = require('electron').dialog;
    console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 970, height: 700});

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});
