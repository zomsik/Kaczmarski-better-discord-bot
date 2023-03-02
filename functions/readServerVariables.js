const fs = require('fs');
const path = require("path");

function readServerVariables(serverId, key) {

    const serverData = fs.readFileSync(path.resolve(__dirname, '../serversVariables.json'));
    const serverJson = JSON.parse(serverData);

    return serverJson[serverId][key] || null;

  }
  
  module.exports = readServerVariables;