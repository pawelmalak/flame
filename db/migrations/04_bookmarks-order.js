const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

const up = async (query) => {
  await query.addColumn('bookmarks', 'orderId', {
    type: INTEGER,
    allowNull: true,
    defaultValue: null,
  });
};

const down = async (query) => {
  await query.removeColumn('bookmarks', 'orderId');
};

module.exports = {
  up,
  down,
};
