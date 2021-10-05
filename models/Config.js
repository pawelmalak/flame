const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Config = sequelize.define(
  'Config',
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valueType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isLocked: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    tableName: 'config',
  }
);

module.exports = Config;
