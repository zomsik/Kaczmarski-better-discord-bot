import fs from 'fs';
import path from 'path';

function checkIfFileExists(fileName: string): boolean {

  if (!fs.existsSync(path.resolve(__dirname, fileName))) {
    return false;
  } else {
    return true;
  }

}

export default checkIfFileExists;