const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Weather = sequelize.define('Weather', {
  externalLastUpdate: DataTypes.STRING,
  tempC: DataTypes.FLOAT,
  tempF: DataTypes.FLOAT,
  isDay: DataTypes.INTEGER,
  conditionText: DataTypes.TEXT,
  conditionCode: DataTypes.INTEGER
}, {
  tableName: 'weather'
});

module.exports = Weather;