const schedule = require('node-schedule');
const getExternalWeather = require('./getExternalWeather');

const weatherJob = schedule.scheduleJob('updateWeather', '0 */15 * * * *', async () => {
  try {
    await getExternalWeather();
    console.log('weather updated');
  } catch (err) {
    console.log(err);
  }
})