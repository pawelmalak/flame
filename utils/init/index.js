const initConfig = require('./initConfig');
const initFiles = require('./initFiles');
const initDockerSecrets = require('./initDockerSecrets');
const normalizeTheme = require('./normalizeTheme');

const initApp = async () => {
  initDockerSecrets();
  await initFiles();
  await initConfig();
  await normalizeTheme();
};

module.exports = initApp;
