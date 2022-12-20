const { app, BrowserWindow, Menu } = require('electron')

const url = require('url')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
//    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  })
}

//
// Creación de pestañas principal y secundarias
//
let mainWindow
let newWindow

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  
  mainWindow.loadURL(startUrl)
  Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu))
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

function createNewWindow() {
    newWindow = new BrowserWindow({
    width: 400,
    height: 330,
    title: 'Window'
    }
  )
}
