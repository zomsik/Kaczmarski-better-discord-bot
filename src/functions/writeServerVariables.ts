import fs from 'fs';
import path from 'path';
import checkIfFileExists from './checkIfFileExists';

function writeServerVariables(serverId: string, newKey: string, newValue: boolean | string | null): void {

  const fileName = '../serversVariables.json';

  checkIfFileExists(fileName)
    
  const serversData = fs.readFileSync(path.resolve(__dirname, fileName));
  const serversJson: { [key: string]: any } = JSON.parse(serversData.toString());

  if (!serversJson[serverId] || serversJson[serverId][newKey] === undefined) {
    serversJson[serverId] = serversJson[serverId] || {};
  }

  if (newValue == "" || newValue == null) {
    delete serversJson[serverId][newKey];
  } else {
    serversJson[serverId][newKey] = newValue;
  }

  fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(serversJson, null, 2));
}

export default writeServerVariables;