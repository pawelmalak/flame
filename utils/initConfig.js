const { Op } = require('sequelize');
const Config = require('../models/Config');

const initConfig = async () => {
  // Config keys
  const keys = ['WEATHER_API_KEY', 'lat', 'long', 'isCelsius', 'customTitle'];
  const values = ['', 0, 0, true, 'Flame'];

  // Get config values
  const configPairs = await Config.findAll({
    where: {
      key: {
        [Op.or]: keys
      }
    }
  })

  // Get key from each pair
  const configKeys = configPairs.map((pair) => pair.key);

  // Create missing pairs
  keys.forEach(async (key, idx) => {
    if (!configKeys.includes(key)) {
      await Config.create({
        key,
        value: values[idx],
        valueType: typeof values[idx]
      })
    }
  })

  console.log('Initial config created');
  return;
}

module.exports = initConfig;