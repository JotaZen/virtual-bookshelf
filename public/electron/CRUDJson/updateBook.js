const fs = require("fs")
const path = require('path')  

async function updateBook(dataPath, newBook){
  let data = JSON.parse(fs.readFileSync(dataPath))
  let index = data['books'].findIndex(book => book.id == newBook.id);
  data['books'].splice(index, 1, newBook);
  const newData = JSON.stringify(data, null, 2)

  fs.writeFile(dataPath, newData, (err) => {
    if (err) {
      throw err
    }
  })
}

module.exports = { updateBook }