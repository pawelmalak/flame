const { Op } = require('sequelize');
const Weather = require('../models/Weather');

const clearWeatherData = async () => {
  const weather = await Weather.findOne({
    order: [[ 'createdAt', 'DESC' ]]
  });

  if (weather) {
    await Weather.destroy({
      where: {
        id: {
          [Op.lt]: weather.id
        }
      }
    })
  }

  console.log('Old weather data was deleted');
}

module.exports = clearWeatherData;