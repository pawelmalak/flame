const fs = require('fs');

const checkFileExists = (path) => {
  return fs.promises
    .access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};

module.exports = checkFileExists;
