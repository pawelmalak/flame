const { Op } = require('sequelize');
const Weather = require('../models/Weather');
const Logger = require('./Logger');
const logger = new Logger();
const loadConfig = require('./loadConfig');

const clearWeatherData = async () => {
  const { WEATHER_API_KEY: secret } = await loadConfig();

  const weather = await Weather.findOne({
    order: [['createdAt', 'DESC']],
  });

  if (weather) {
    await Weather.destroy({
      where: {
        id: {
          [Op.lt]: weather.id,
        },
      },
    });
  }

  if (secret) {
    logger.log('Old weather data was deleted');
  }
};

module.exports = clearWeatherData;
