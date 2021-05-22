const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Bookmark = sequelize.define('Bookmark', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'bookmarks'
});

module.exports = Bookmark;