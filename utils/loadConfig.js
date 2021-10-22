const { readFile } = require('fs/promises');
const checkFileExists = require('../utils/checkFileExists');
const initConfig = require('../utils/init/initConfig');

const loadConfig = async () => {
  const configExists = await checkFileExists('data/config.json');

  if (!configExists) {
    await initConfig();
  }

  const config = await readFile('data/config.json', 'utf-8');
  const parsedConfig = JSON.parse(config);

  return parsedConfig;
};

module.exports = loadConfig;
