const schedule = require('node-schedule');
const getExternalWeather = require('./getExternalWeather');
const clearWeatherData = require('./clearWeatherData');
const Sockets = require('../Sockets');
const Logger = require('./Logger');
const loadConfig = require('./loadConfig');
const logger = new Logger();

// Update weather data every 15 minutes
const weatherJob = schedule.scheduleJob(
  'updateWeather',
  '0 */15 * * * *',
  async () => {
    const { WEATHER_API_KEY: secret } = await loadConfig();

    try {
      const weatherData = await getExternalWeather();
      logger.log('Weather updated');
      Sockets.getSocket('weather').socket.send(JSON.stringify(weatherData));
    } catch (err) {
      if (secret) {
        logger.log(err.message, 'ERROR');
      }
    }
  }
);

// Clear old weather data every 4 hours
const weatherCleanerJob = schedule.scheduleJob(
  'clearWeather',
  '0 5 */4 * * *',
  async () => {
    clearWeatherData();
  }
);
