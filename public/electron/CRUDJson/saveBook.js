const fs = require("fs")
const path = require('path')

async function saveBook(dataPath, newBook) {
  let data = JSON.parse(fs.readFileSync(dataPath))
  data['books'].push(newBook)

  const newData = JSON.stringify(data, null, 2)

  fs.writeFile(dataPath, newData, (err) => {
    if (err) {
      throw err
    }
  })
}

module.exports = { saveBook }
