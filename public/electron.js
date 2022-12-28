const { app, BrowserWindow, Menu } = require('electron')

const url = require('url')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
//    Crashing --
//    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
//
})
}

//
// Creación de pestaña principal
//
const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  
  mainWindow.loadURL(startUrl)
  Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu))

  mainWindow.on('close', () => {app.quit()})
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
})

//
// Etiquetas menú superior
//
const templateMenu = [
  {
    label: 'Data',
    submenu: [
      {
        label: 'New baook',
        accelerator: 'Ctrl+N',
        click() {

        }
      }
    ]
  },
  {
    label: 'Nueva Pestaña',
    click() {
      createNewWindow()
    }
  }
]
// Developer Tools in Development Environment
if (process.env.NODE_ENV !== 'production') {
  templateMenu.push({
    label: 'DevTools',
    submenu: [
      {
        label: 'Show/Hide Dev Tools',
        accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
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
    pathname: path.join(__dirname, process.env.NODE_ENV !== 'production' ? 'views/test.html' : '../build/views/test.html'),
    protocol: 'file:',
    slashes: true,
  }))

  newWindow.on('close', () => {newWindow = null})
  
}
