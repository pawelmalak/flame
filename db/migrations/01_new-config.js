const { readFile, writeFile, copyFile } = require('fs/promises');
const Config = require('../../models/Config');

const up = async (query) => {
  await copyFile('utils/init/initialConfig.json', 'data/config.json');

  const initConfigFile = await readFile('data/config.json', 'utf-8');
  const parsedNewConfig = JSON.parse(initConfigFile);

  const existingConfig = await Config.findAll({ raw: true });

  for (let pair of existingConfig) {
    const { key, value, valueType } = pair;

    let newValue = value;

    if (valueType == 'number') {
      newValue = parseFloat(value);
    } else if (valueType == 'boolean') {
      newValue = value == 1;
    }

    parsedNewConfig[key] = newValue;
  }

  const newConfig = JSON.stringify(parsedNewConfig);
  await writeFile('data/config.json', newConfig);

  await query.dropTable('config');
};

const down = async (query) => {};

module.exports = {
  up,
  down,
};
