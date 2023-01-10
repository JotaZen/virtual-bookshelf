const { ipcRenderer, contextBridge } = require('electron')
const fs = require('fs')
const { saveBook } = require('./electron/CRUDJson/saveBook')

contextBridge.exposeInMainWorld('electron', {
  main: {
    async getMainPath() {
      let mainPath = await ipcRenderer.invoke('getMainPath')
      return mainPath
    },
    async getImgPath(folder = "") {
      let img = await ipcRenderer.invoke('getImgPath', folder)
      return img
    },
    reload: () => {
      ipcRenderer.send('reloadMain')
    }
  },
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message)
    },
    async ping() {
      console.log('pong')
    }
  },
  CRUD: {
    async retrieveBooks(filterCallback) {
      let data = await ipcRenderer.invoke('retrieveBooks', filterCallback)
      return data
    },
    saveBook: async (newBook) => {
      ipcRenderer.send('saveBook', newBook)
    },
    updateBook: async (newBook) => {
      ipcRenderer.send('updateBook', newBook)
    },
    deleteBookImg: async (imgPath) => {
      ipcRenderer.send('deleteBookImg', imgPath)
    },
    saveBookImg: async (newImgPath, copyPath) => {
      ipcRenderer.send('saveBookImg', newImgPath, copyPath)
    },
    deleteBook: async (id) => {
      ipcRenderer.send('deleteBook', id)
    }
  },
  experimental: {
    overWriteData: async (newDataPath) => {
      ipcRenderer.send('overWriteData', newDataPath)
    },
    saveImageData: async (newFolder) => {
      ipcRenderer.send('saveImageData', newFolder)
    },
    loadImageData: async (folder) => {
      ipcRenderer.send('loadImageData', folder)
    }
  }
})