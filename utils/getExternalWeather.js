const Weather = require('../models/Weather');
const axios = require('axios');
const loadConfig = require('./loadConfig');

const getExternalWeather = async () => {
  const { WEATHER_API_KEY: secret, lat, long } = await loadConfig();

  if (!secret) {
    throw new Error('API key was not found. Weather updated failed');
  }

  if (!lat || !long) {
    throw new Error('Location was not found. Weather updated failed');
  }

  // Fetch data from external API
  try {
    const res = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${secret}&q=${lat},${long}`
    );

    // Save weather data
    const cursor = res.data.current;
    const weatherData = await Weather.create({
      externalLastUpdate: cursor.last_updated,
      tempC: cursor.temp_c,
      tempF: cursor.temp_f,
      isDay: cursor.is_day,
      cloud: cursor.cloud,
      conditionText: cursor.condition.text,
      conditionCode: cursor.condition.code,
    });
    return weatherData;
  } catch (err) {
    throw new Error('External API request failed');
  }
};

module.exports = getExternalWeather;
