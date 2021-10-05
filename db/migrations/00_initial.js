const { DataTypes } = require('sequelize');
const { INTEGER, DATE, STRING, TINYINT, FLOAT, TEXT } = DataTypes;

const up = async (query) => {
  // CONFIG TABLE
  await query.createTable('config', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: STRING,
      allowNull: false,
    },
    valueType: {
      type: STRING,
      allowNull: false,
    },
    isLocked: {
      type: TINYINT,
      defaultValue: 0,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  });

  // WEATHER TABLE
  await query.createTable('weather', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    externalLastUpdate: {
      type: STRING,
    },
    tempC: {
      type: FLOAT,
    },
    tempF: {
      type: FLOAT,
    },
    isDay: {
      type: INTEGER,
    },
    cloud: {
      type: INTEGER,
    },
    conditionText: {
      type: TEXT,
    },
    conditionCode: {
      type: INTEGER,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  });

  // CATEGORIES TABLE
  await query.createTable('categories', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    isPinned: {
      type: TINYINT,
      defaultValue: 0,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
    orderId: {
      type: INTEGER,
      defaultValue: null,
    },
  });

  // BOOKMARKS TABLE
  await query.createTable('bookmarks', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    url: {
      type: STRING,
      allowNull: false,
    },
    categoryId: {
      type: INTEGER,
      allowNull: false,
    },
    icon: {
      type: STRING,
      defaultValue: '',
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  });

  // APPS TABLE
  await query.createTable('apps', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    url: {
      type: STRING,
      allowNull: false,
    },
    icon: {
      type: STRING,
      allowNull: false,
      defaultValue: 'cancel',
    },
    isPinned: {
      type: TINYINT,
      defaultValue: 0,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
    orderId: {
      type: INTEGER,
      defaultValue: null,
    },
  });
};

const down = async (query) => {
  await query.dropTable('config');
  await query.dropTable('weather');
  await query.dropTable('categories');
  await query.dropTable('bookmarks');
  await query.dropTable('apps');
};

module.exports = {
  up,
  down,
};
