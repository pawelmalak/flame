const { Sequelize } = require('sequelize');
const Logger = require('./utils/Logger');
const logger = new Logger();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/db.sqlite',
  logging: false
})

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.log('Connected to database');
    
    const syncModels = false;
    
    if (syncModels) {
      logger.log('Starting model synchronization');
      await sequelize.sync({ alter: true });
      logger.log('All models were synchronized');
    }
  } catch (error) {
    logger.log(`Unable to connect to the database: ${error.message}`, 'ERROR');
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  sequelize
}