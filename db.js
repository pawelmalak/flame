const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/db.sqlite',
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    
    await sequelize.sync({ alter: true });
    console.log('All models were synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  connectDB,
  sequelize
};