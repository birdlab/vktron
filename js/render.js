/**
 * Created by Bird on 02.04.16.
 */

'use strict';

const ipcRenderer = require('electron').ipcRenderer;
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

ipcRenderer.on('asynchronous-reply', function(event, arg) {
    console.log(arg); // prints "pong"
});
ipcRenderer.send('asynchronous-message', 'ping');
