const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const App = sequelize.define('App', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'cancel'
  },
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = App;