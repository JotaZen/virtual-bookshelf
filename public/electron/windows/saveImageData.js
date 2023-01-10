const fs = require("fs")
const path = require('path')


async function saveImageData(source, destiny, folderName) {
  fs.mkdir(path.join(destiny, folderName), { recursive: true }, (err) => {
    if (err) throw err
  })
  fs.readdir(source, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });
}

module.exports = { saveImageData }
