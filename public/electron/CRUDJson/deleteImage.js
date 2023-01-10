const fs = require("fs")
const path = require('path')

async function deleteImage(pathToImage) {
  fs.unlink(pathToImage, (err) => {
    if (err) {
    }
  })
}

module.exports = { deleteImage }
