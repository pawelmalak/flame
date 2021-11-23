const { DataTypes } = require('sequelize');
const { INTEGER, FLOAT } = DataTypes;

const up = async (query) => {
  await query.addColumn('weather', 'humidity', {
    type: INTEGER,
  });

  await query.addColumn('weather', 'windK', {
    type: FLOAT,
  });

  await query.addColumn('weather', 'windM', {
    type: FLOAT,
  });
};

const down = async (query) => {
  await query.removeColumn('weather', 'humidity');
  await query.removeColumn('weather', 'windK');
  await query.removeColumn('weather', 'windM');
};

module.exports = {
  up,
  down,
};
