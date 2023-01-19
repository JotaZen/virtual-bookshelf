const fs = require("fs")
const path = require('path')

async function clearImages(dataPath, newBook) {
  let data = JSON.parse(fs.readFileSync(dataPath))
  for (let i = 0; i < data['books'].length; i++) {
    delete data['books'][i]['image_src'];
  }
  const newData = JSON.stringify(data, null, 2)

  fs.writeFile(dataPath, newData, (err) => {
    if (err) {
      throw err
    }
  })
}

module.exports = { clearImages }

