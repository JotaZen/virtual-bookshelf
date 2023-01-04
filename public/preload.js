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
    }
  }
})