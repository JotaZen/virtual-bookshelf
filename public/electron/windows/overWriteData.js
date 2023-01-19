const fs = require("fs")
const path = require('path')

async function overWriteData(source, destiny, dirToClear) {

  let data = JSON.parse(fs.readFileSync(source))
  if (data.metadata.code === 'JZ') {
    fs.copyFile(source, destiny, (err) => {
      if (err) {
        throw err
      }
    })
    await fs.rm(dirToClear, { recursive: true, force: true }, (err) => {
      if (err) {
        throw err
      } else {
        fs.mkdir(dirToClear, (err) => {
          if (err) {
            throw err
          }
        })
      }
    })
  }
  else {
    throw 'Not Valid File'
  }

}


module.exports = { overWriteData }