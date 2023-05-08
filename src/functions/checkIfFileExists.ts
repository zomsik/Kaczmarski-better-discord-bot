import fs from 'fs';
import path from 'path';

function checkIfFileExists(fileName: string): void {

  if (!fs.existsSync(path.resolve(__dirname, fileName))) {
    const emptyObject: any = {};
    fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(emptyObject));
  }
  
}

export default checkIfFileExists;