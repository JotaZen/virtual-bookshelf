const { Notification } = require('electron')
const fs = require('fs')
const path = require('path')

async function retrieveBooks(dataPath, filterCallback=null){
  //new Notification({ title: 'Cargando Libros', body: 'Funciona!' }).show()

  let data = JSON.parse(fs.readFileSync(dataPath))

  if (filterCallback) {
    return data.filter(filterCallback)
  } else {
    return data
  }
}

module.exports = { retrieveBooks }