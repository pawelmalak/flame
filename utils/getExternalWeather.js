const Config = require('../models/Config');
const Weather = require('../models/Weather');
const axios = require('axios');

const getExternalWeather = async () => {
  // Get API key from database
  let secret = await Config.findOne({
    where: { key: 'WEATHER_API_KEY' }
  });

  if (!secret) {
    console.log('API key was not found');
    return;
  }

  secret = secret.value;

  // Fetch data from external API
  try {
    const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${secret}&q=52.229676,21.012229`);

    // For dev
    // console.log(res.data);

    // Save weather data
    const cursor = res.data.current;
    await Weather.create({
      externalLastUpdate: cursor.last_updated,
      tempC: cursor.temp_c,
      tempF: cursor.temp_f,
      isDay: cursor.is_day,
      conditionText: cursor.condition.text,
      conditionCode: cursor.condition.code
    });
  } catch (err) {
    console.log(err);
    console.log('External API request failed');
    return;
  }
}

module.exports = getExternalWeather;