const Weather = require('../models/Weather');
const axios = require('axios');
const loadConfig = require('./loadConfig');

const getExternalWeather = async () => {
  const { WEATHER_API_KEY: secret, lat, long } = await loadConfig();

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
      humidity: cursor.humidity,
      windK: cursor.wind_kph,
      windM: cursor.wind_mph,
    });
    return weatherData;
  } catch (err) {
    throw new Error('External API request failed');
  }
};

module.exports = getExternalWeather;
