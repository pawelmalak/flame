const initConfig = require('./initConfig');
const initFiles = require('./initFiles');

const initApp = async () => {
  await initFiles();
  await initConfig();
};

module.exports = initApp;
