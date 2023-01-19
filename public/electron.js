const { app, BrowserWindow, Menu, ipcMain, Notification, globalShortcut } = require('electron')

const url = require('url')
const path = require('path')

// Funciones del CRUD
const { retrieveBooks } = require('./electron/CRUDJson/retrieveBooks.js')
const { saveBook } = require('./electron/CRUDJson/saveBook.js')
const { saveImage } = require('./electron/CRUDJson/saveImage.js')
const { deleteImage } = require('./electron/CRUDJson/deleteImage.js')
const { deleteBook } = require('./electron/CRUDJson/deleteBook.js')
const { updateBook } = require('./electron/CRUDJson/updateBook.js')
const { overWriteData } = require('./electron/windows/overWriteData.js')
const { saveImageData } = require('./electron/windows/saveImageData.js')
const { loadImageData } = require('./electron/windows/loadImageData.js')
const { clearImages } = require('./electron/windows/clearImages.js')
//
// Creación de pestaña principal
//
let mainWindow
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#fff',
    webPreferences: {
      spellcheck: false,
      nodeIntegration: true,
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
  })
  mainWindow.setTitle('Raúl Espinoza')
  mainWindow.loadURL(startUrl)
  Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu))

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
  })
  mainWindow.on('close', () => { app.quit() })
  mainWindow.webContents.setZoomFactor(1.0);
  mainWindow.webContents
    .setVisualZoomLevelLimits(1, 1.5)
    .catch((err) => console.log(err))
  mainWindow.webContents.on("zoom-changed", (event, zoomDirection) => {
    let currentZoom = mainWindow.webContents.getZoomFactor()
    if (zoomDirection === "in" && currentZoom < 1.5) {
      mainWindow.webContents.zoomFactor = currentZoom + 0.2
    }
    if (zoomDirection === "out" && currentZoom > 0.8) {
      mainWindow.webContents.zoomFactor = currentZoom - 0.2
    }

  })
}

app.whenReady().then(() => {
  // if (new Date('02/01/2023') < Date.now()) {
  //   app.quit()
  //   return
  // }
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
          focusedWindow.toggleDevTools()
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}

//
//  IPC
//  Save Data
//
//
const mainPath = path.join(app.getAppPath(), app.isPackaged ? '..' : '')

ipcMain.on('reloadMain', (event) => {
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
  } catch {
    new Notification({ title: 'Error', body: 'No se pudo añadir el libro.' }).show()
  }
})
ipcMain.on('saveBookImg', (event, newImgPath, copyPath) => {
  saveImage(newImgPath, copyPath)
})
ipcMain.on('deleteBookImg', (event, imgPath) => {
  deleteImage(imgPath)
})
ipcMain.on('deleteBook', (event, id) => {
  try {
    deleteBook(path.join(mainPath, 'assets', 'data', 'libros.json'), id)
    new Notification({ title: 'Biblioteca', body: `Se borró el libro n°${id} correctamente.` }).show()
  } catch {
    new Notification({ title: 'Error', body: 'No se pudo borrar el libro.' }).show()
  }
})
ipcMain.on('updateBook', (event, newBook) => {
  try {
    updateBook(path.join(mainPath, 'assets', 'data', 'libros.json'), newBook)
    new Notification({ title: 'Biblioteca', body: 'Se actualizó el libro correctamente.' }).show()
  } catch {
    new Notification({ title: 'Error', body: 'No se pudo actualizar el libro.' }).show()
  }
})
ipcMain.handle('getMainPath', (event) => {
  return mainPath
})
ipcMain.handle('getImgPath', (event, folder) => {
  return path.join(mainPath, "assets", "img", folder)
})

ipcMain.on('overWriteData', (event, newDataPath) => {
  overWriteData(
    newDataPath,
    path.join(mainPath, 'assets', 'data', 'libros.json'),
    path.join(mainPath, 'assets', 'img', 'books'))
})
ipcMain.on('saveImageData', (event, newFolder) => {
  saveImageData(path.join(mainPath, 'assets', 'img', 'books'), folder)
})
ipcMain.on('loadImageData', (event, folder) => {
  loadImageData(folder)
})

ipcMain.handle('getVersion', (event) => {
  const version = app.getVersion()
  return version
})
