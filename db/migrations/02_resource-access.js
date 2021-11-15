const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

const tables = ['categories', 'bookmarks', 'apps'];

const up = async (query) => {
  const template = {
    type: INTEGER,
    allowNull: true,
    defaultValue: 1,
  };

  for await (let table of tables) {
    await query.addColumn(table, 'isPublic', template);
  }
};

const down = async (query) => {
  for await (let table of tables) {
    await query.removeColumn(table, 'isPublic');
  }
};

module.exports = {
  up,
  down,
};
