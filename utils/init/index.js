const initConfig = require('./initConfig');
const initFiles = require('./initFiles');
const initDockerSecrets = require('./initDockerSecrets');

const initApp = async () => {
  initDockerSecrets();
  await initFiles();
  await initConfig();
};

module.exports = initApp;
