const { copyFile, readFile, writeFile } = require('fs/promises');
const checkFileExists = require('../checkFileExists');
const initialConfig = require('./initialConfig.json');

const initConfig = async () => {
  const configExists = await checkFileExists('data/config.json');

  if (!configExists) {
    await copyFile('utils/init/initialConfig.json', 'data/config.json');
  }

  const existingConfig = await readFile('data/config.json', 'utf-8');
  const parsedConfig = JSON.parse(existingConfig);

  // Add new config pairs if necessary
  for (let key in initialConfig) {
    if (!Object.keys(parsedConfig).includes(key)) {
      parsedConfig[key] = initialConfig[key];
    }
  }

  await writeFile('data/config.json', JSON.stringify(parsedConfig));
};

module.exports = initConfig;
