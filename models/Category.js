const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'categories'
});

module.exports = Category;