const fs = require('fs');
const path = require("path");

function checkIfFileExists(fileName) {

  if (!fs.existsSync(path.resolve(__dirname, fileName))) {
    return false;
  } else {
    return true;
  }

}
  module.exports = checkIfFileExists;