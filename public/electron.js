const { app, BrowserWindow, Menu, ipcMain, Notification, globalShortcut } = require('electron')

const url = require('url')
const path = require('path')

// Funciones del CRUD
const { retrieveBooks } = require('./electron/CRUDJson/retrieveBooks')
const { changeBook } = require('./electron/CRUDJson/test_changeBook')
const { saveBook } = require('./electron/CRUDJson/saveBook.js')
const { saveImage } = require('./electron/CRUDJson/saveImage.js')
const { deleteBook } = require('./electron/CRUDJson/deleteBook.js')
//
// Creación de pestaña principal
//
let mainWindow
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#8a2be2',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      sandbox: false,
      webSecurity: app.isPackaged ? true : false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.setTitle('Raúl Espinoza')
  mainWindow.loadURL(startUrl)
  Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu))

  mainWindow.on('close', () => {app.quit()})
}

app.whenReady().then(() => {
  createWindow()
  globalShortcut.register('CommandOrControl+Shift+j', () => {
    mainWindow.toggleDevTools()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  app.on('window-all-closed', () => {
    app.quit()
  })
})

const templateMenu = []
// Developer Tools in Development Environment
if (!app.isPackaged) {
  templateMenu.push({
    label: 'DevTools',
    submenu: [
      {
        label: 'Show/Hide Dev Tools',
        accelerator: 'Ctrl+D',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}

//
// Ventana secundaria
//
let newWindow
function createNewWindow() {
  if (newWindow) {
    return
  } 
  newWindow = new BrowserWindow({
  width: 400,
  height: 330,
  title: '...'
  })

  newWindow.setMenu(null)
  newWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/test.html'),
    protocol: 'file:',
    slashes: true,
  }))

  newWindow.on('close', () => {newWindow = null})
}

//
//  IPC
//  Save Data
//
//
const mainPath = path.join(app.getAppPath(), app.isPackaged ? '..' : '')

ipcMain.on('reload', (event) => {
  mainWindow.webContents.reload()
})

ipcMain.handle('retrieveBooks', (event) => {
  const booksPath = path.join(mainPath, 'assets', 'data', 'libros.json')
  const books_data = retrieveBooks(booksPath)
  return books_data
})

ipcMain.on('saveBook', (event, newBook) => {
  try {
    saveBook(path.join(mainPath, 'assets', 'data', 'libros.json'), newBook)
    new Notification({ title: 'Biblioteca', body: 'Se agregó el libro correctamente.' }).show()
  } catch {
    new Notification({ title: 'Error', body: 'No se pudo añadir el libro.' }).show()
  }
})
ipcMain.on('saveBookImg', (event, newImgPath, copyPath) => {
  saveImage(newImgPath, copyPath)
})
ipcMain.on('deleteBook', (event, id) => {
  try {
    deleteBook(path.join(mainPath, 'assets', 'data', 'libros.json'), id)
    new Notification({ title: 'Biblioteca', body: 'Se borró el libro correctamente.' }).show()
  } catch {
    new Notification({ title: 'Error', body: 'No se pudo borrar el libro.' }).show()
  }
})
ipcMain.handle('getMainPath', (event) => {
  return mainPath
})
ipcMain.handle('getImgPath', (event, folder) => {
  return path.join(mainPath, "assets", "img", folder)
})

