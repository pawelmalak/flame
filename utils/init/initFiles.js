const createFile = require('./createFile');
const { files } = require('./initialFiles.json');

const initFiles = async () => {
  files.forEach(async (file) => await createFile(file));
};

module.exports = initFiles;
