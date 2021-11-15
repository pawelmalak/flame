const { Sequelize } = require('sequelize');
const { join } = require('path');
const Umzug = require('umzug');

// Utils
const backupDB = require('./utils/backupDb');
const Logger = require('../utils/Logger');
const logger = new Logger();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/db.sqlite',
  logging: false,
});

const umzug = new Umzug({
  migrations: {
    path: join(__dirname, './migrations'),
    params: [sequelize.getQueryInterface()],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
});

const connectDB = async () => {
  try {
    backupDB();

    await sequelize.authenticate();

    // execute all pending migrations
    const pendingMigrations = await umzug.pending();

    if (pendingMigrations.length > 0) {
      logger.log('Executing pending migrations');
      await umzug.up();
    }

    logger.log('Connected to database');
  } catch (error) {
    logger.log(`Unable to connect to the database: ${error.message}`, 'ERROR');
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  sequelize,
};
