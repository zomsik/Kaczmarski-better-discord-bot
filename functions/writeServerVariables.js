const fs = require('fs');
const path = require("path");
const checkIfFileExists = require('./checkIfFileExists');

function writeServerVariables(serverId, newKey, newValue) {

    const fileName = '../serversVariables.json';

    if (!checkIfFileExists(fileName)) {
        var serversData = {};
        fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(serversData));
    
    }
    else {
        var serversData = fs.readFileSync(path.resolve(__dirname, fileName));
    }


    const serversJson = JSON.parse(serversData);

    if (!serversJson[serverId] || serversJson[serverId][newKey] === undefined) {
        serversJson[serverId] = serversJson[serverId] || {};
    }

    if (newValue == "" || newValue == null || newValue == undefined)
    {
        delete serversJson[serverId][newKey];
    } 
    else {
        serversJson[serverId][newKey] = newValue;

    }
    
    fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(serversJson, null, 2));
    

  }
  
  module.exports = writeServerVariables;