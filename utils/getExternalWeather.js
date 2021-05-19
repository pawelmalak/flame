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
    console.log('API key was not found. Weather updated failed');
    return;
  }

  if (!lat || !long) {
    console.log('Location was not found. Weather updated failed');
    return;
  }

  // Fetch data from external API
  try {
    const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${secret.value}&q=${lat.value},${long.value}`);

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