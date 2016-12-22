import { app, BrowserWindow } from 'electron';
import main from './browser';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    webPreferences: {
      webSecurity: false,
    },
    // resizable: false,
    show: true,
    // transparent: true,
    // frame: false,
    // alwaysOnTop: true,
  });

  mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);

  mainWindow.webContents.openDevTools({ detach: true });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

main(mainWindow);
