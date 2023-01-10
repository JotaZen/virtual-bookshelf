const { Notification } = require('electron')
const fs = require("fs")
const path = require('path')

async function saveImage(source, destiny) {
  fs.copyFile(source, destiny, (err) => {
    if (err) {
    }
  })
}

module.exports = { saveImage }
