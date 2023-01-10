const { Notification } = require('electron')
const fs = require("fs")
const path = require('path')  

async function deleteBook(dataPath, id) {
  let data = JSON.parse(fs.readFileSync(dataPath))
  data['books'] = data['books'].filter(book => book.id !== id)

  const newData = JSON.stringify(data, null, 2)

  fs.writeFile(dataPath, newData, (err) => {
    if (err) {
      throw err
    }
  })
}

module.exports = { deleteBook }