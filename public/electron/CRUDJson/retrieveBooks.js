const { Notification } = require('electron')
const fs = require('fs')
const path = require('path')

async function retrieveBooks(dataPath) {
  let data = JSON.parse(fs.readFileSync(dataPath))
  return data['books']
}

module.exports = { retrieveBooks }