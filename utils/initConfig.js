const { Op } = require('sequelize');
const Config = require('../models/Config');
const { config } = require('./initialConfig.json');

const initConfig = async () => {
  // Get config values
  const configPairs = await Config.findAll({
    where: {
      key: {
        [Op.or]: config.map(pair => pair.key)
      }
    }
  })

  // Get key from each pair
  const configKeys = configPairs.map((pair) => pair.key);

  // Create missing pairs
  config.forEach(async ({ key, value}) => {
    if (!configKeys.includes(key)) {
      await Config.create({
        key,
        value,
        valueType: typeof value
      })
    }
  })

  console.log('Initial config created');
  return;
}

module.exports = initConfig;