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
      let img = await ipcRenderer.invoke('getImgPath',folder)
      return img
    },
    reload: () => {
      ipcRenderer.send('reload')
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
      let data = await ipcRenderer.invoke('retrieveBooks',filterCallback)
      return data
    },
    saveBook: async (newBook) => {
      ipcRenderer.send('saveBook',newBook)
    },
    saveBookImg: async (newImgPath, copyPath) => {
      ipcRenderer.send('saveBookImg',newImgPath, copyPath)
    },
    deleteBook: async (id) => {
      ipcRenderer.send('deleteBook',id)
    }
  }
})