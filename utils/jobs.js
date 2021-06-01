const schedule = require('node-schedule');
const getExternalWeather = require('./getExternalWeather');
const Sockets = require('../Sockets');

const weatherJob = schedule.scheduleJob('updateWeather', '0 */15 * * * *', async () => {
  try {
    const weatherData = await getExternalWeather();
    console.log('weather updated');
    Sockets.getSocket('weather').socket.send(JSON.stringify(weatherData));
  } catch (err) {
    console.log(err.message);
  }
})