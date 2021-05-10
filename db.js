const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log('Connected to database'.cyan.underline);
    await sequelize.sync({
      // alter: true,
      logging: false
    });
    console.log('All models were synced'.cyan.underline);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  connectDB,
  sequelize
};