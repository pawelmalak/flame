const { getSecrets } = require('docker-secret');
const Logger = require('../Logger');
const logger = new Logger();

const initSecrets = () => {
  const secrets = getSecrets();

  for (const property in secrets) {
    const upperProperty = property.toUpperCase();
    process.env[upperProperty] = secrets[property];
    logger.log(`${upperProperty} was overwritten with docker secret value`, 'WARN');
  }
};

module.exports = initSecrets;
