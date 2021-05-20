const { BrowserWindow, app, ipcMain } = require('electron');
const { ConnectionBuilder } = require("electron-cgi");
const path = require('path');

// const isDev = !app.isPackaged;

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 400,
    show: false,
    menuBarVisible: false,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // win.setMenu(null);

  win.loadFile('./app/index.html');

  win.once('ready-to-show', ()=> {
      win.show();
  });

}

app.whenReady().then(createWindow);

// C# IPC 

let connection = new ConnectionBuilder()
  .connectTo("dotnet", "run", "--project", "./testCSharp")
  .build();

connection.onDisconnect = () => {
  console.log("lost");
};

connection.send("greeting", "KQ", (err,resp) => {
  if(err){
    console.log("Error while IPC :: greeting");
  }
  console.log(resp);
  // connection.close();
});

// React IPC

ipcMain.on('add',(e, num)=>{
  console.log("Received add event. Sending signal to C#.");

  connection.send("add",num,(err, resp) => {
    if(err){
      console.log("Error while IPC :: add");
    }
    console.log("Received updated value from C#. Sending updated value to React.");
    e.sender.webContents.send("update",resp);
  });

});