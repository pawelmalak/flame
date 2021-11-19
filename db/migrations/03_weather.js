const { DataTypes } = require('sequelize');
const { INTEGER, FLOAT } = DataTypes;
const loadConfig = require('../../utils/loadConfig');
const getExternalWeather = require('../../utils/getExternalWeather');

const up = async (query) => {
  await query.addColumn('weather', 'humidity', {
    type: INTEGER,
  });

  await query.addColumn('weather', 'windK', {
    type: FLOAT,
  });

  await query.addColumn('weather', 'windM', {
    type: FLOAT,
  });

  const { WEATHER_API_KEY: secret } = await loadConfig();

  if (secret) {
    await getExternalWeather();
  }
};

const down = async (query) => {
  await query.removeColumn('weather', 'humidity');
  await query.removeColumn('weather', 'windK');
  await query.removeColumn('weather', 'windM');
};

module.exports = {
  up,
  down,
};
