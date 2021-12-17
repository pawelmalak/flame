const { DataTypes } = require('sequelize');
const { STRING } = DataTypes;

const up = async (query) => {
  await query.addColumn('apps', 'description', {
    type: STRING,
    allowNull: false,
    defaultValue: '',
  });
};

const down = async (query) => {
  await query.removeColumn('apps', 'description');
};

module.exports = {
  up,
  down,
};
