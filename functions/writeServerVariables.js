const fs = require('fs');
const path = require("path");

function writeServerVariables(serverId, newKey, newValue) {

    const serversData = fs.readFileSync(path.resolve(__dirname, '../serversVariables.json'));
    const serversJson = JSON.parse(serversData);

    if (!serversJson[serverId] || serversJson[serverId][newKey] === undefined) {
        serversJson[serverId] = serversJson[serverId] || {};
    }

    serversJson[serverId][newKey] = newValue;
    fs.writeFileSync(path.resolve(__dirname, '../serversVariables.json'), JSON.stringify(serversJson, null, 2));

  }
  
  module.exports = writeServerVariables;