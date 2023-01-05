const { Notification } = require('electron')
const fs = require("fs")
const path = require('path')  

async function saveBook(dataPath, newBook){
  let data = JSON.parse(fs.readFileSync(dataPath))
  data.push(newBook)

  const newData = JSON.stringify(data, null, 2)

  fs.writeFile(dataPath, newData, (err) => {
    if (err) {
      new Notification({ title: 'Error', body: 'No se pudo añadir el libro.' }).show()
      throw err
    }
    new Notification({ title: 'Biblioteca', body: 'Se agregó el libro correctamente.' }).show()
  })
}

module.exports = { saveBook }
