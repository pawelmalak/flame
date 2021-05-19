const schedule = require('node-schedule');
const getExternalWeather = require('./getExternalWeather');
const Sockets = require('../Sockets');

const weatherJob = schedule.scheduleJob('updateWeather', '0 */15 * * * *', async () => {
  try {
    await getExternalWeather();
    console.log('weather updated');
    Sockets.getSocket('weather').socket.send('weather updated');
  } catch (err) {
    console.log(err);
  }
})