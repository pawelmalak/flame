const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/db.sqlite',
  logging: false
})

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    
    const syncModels = true;

    if (syncModels) {
      console.log('Starting model synchronization');
      await sequelize.sync({ alter: true });
      console.log('All models were synchronized');
    }
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error.message}`);
  }
}

module.exports = {
  connectDB,
  sequelize
}