import fs from 'fs';
import path from 'path';
import KaczmarskiClient from '../KaczmarskiClient';
import checkIfFileExists from './checkIfFileExists';

function readServerVariables(serverId: string, key: string): string | boolean {

  const fileName = '../serversVariables.json';
  const client = KaczmarskiClient.Instance;


  checkIfFileExists(fileName)


  const server = client.guilds.cache.get(serverId);

  
  if (server) {


    const serverData = fs.readFileSync(path.resolve(__dirname, fileName));
    const serverJson = JSON.parse(serverData.toString());

    
    if(!serverJson || !serverJson[serverId]) {
      return false;
    }

    if (key in serverJson[serverId]) {
        return serverJson[serverId][key];
    }
  }
  
  return false;
}

export default readServerVariables;