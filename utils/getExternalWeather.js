const Config = require('../models/Config');
const Weather = require('../models/Weather');
const axios = require('axios');

const getExternalWeather = async () => {
  // Get config from database
  const config = await Config.findAll();

  // Find and check values
  const secret = config.find(pair => pair.key === 'WEATHER_API_KEY');
  const lat = config.find(pair => pair.key === 'lat');
  const long = config.find(pair => pair.key === 'long');

  if (!secret) {
    throw new Error('API key was not found. Weather updated failed');
  }

  if (!lat || !long) {
    throw new Error('Location was not found. Weather updated failed');
  }

  // Fetch data from external API
  try {
    const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${secret.value}&q=${lat.value},${long.value}`);

    // Save weather data
    const cursor = res.data.current;
    const weatherData = await Weather.create({
      externalLastUpdate: cursor.last_updated,
      tempC: cursor.temp_c,
      tempF: cursor.temp_f,
      isDay: cursor.is_day,
      cloud: cursor.cloud,
      conditionText: cursor.condition.text,
      conditionCode: cursor.condition.code
    });
    return weatherData;
  } catch (err) {
    throw new Error('External API request failed');
  }
}

module.exports = getExternalWeather;