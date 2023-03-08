const fs = require('fs');
const path = require("path");
const checkIfFileExists = require('./checkIfFileExists');

function readServerVariables(client, serverId, key) {

  const fileName = '../serversVariables.json';

  if (!checkIfFileExists(fileName)) {
    const emptyObject = {};
    fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(emptyObject));

  }

  const server = client.guilds.cache.get(serverId);

  
  if (server) {

    const serverData = fs.readFileSync(path.resolve(__dirname, fileName));
    const serverJson = JSON.parse(serverData);

    if (key in serverJson)
      return serverJson[serverId][key] || null;

  }
  
  return false;
}
  module.exports = readServerVariables;