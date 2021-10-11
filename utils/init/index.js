const initConfig = require('./initConfig');
const initFiles = require('./initFiles');

const initApp = async () => {
  await initConfig();
  await initFiles();
};

module.exports = initApp;
