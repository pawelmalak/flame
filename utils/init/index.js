const initConfig = require('./initConfig');
const initFiles = require('./initFiles');
const initSecrets = require('./initSecrets');

const initApp = async () => {
  initSecrets();
  await initFiles();
  await initConfig();
};

module.exports = initApp;
