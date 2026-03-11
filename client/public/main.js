const path = require('path');
const { app, BrowserWindow } = require('electron');

let mainWindow = null;

const createWindow = () => {
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Required for legacy nodeIntegration to work as expected
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js') // Use the new shim
    }
  });

  // Log loading progress to console
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Failed to load: ${errorCode} - ${errorDescription}`);
  });

  const isDev = process.env.NODE_ENV === 'development';
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.allowRendererProcessReuse = true;

  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });
}