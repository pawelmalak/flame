const asyncWrapper = require('../../middleware/asyncWrapper');
const Weather = require('../../models/Weather');

// @desc      Get latest weather status
// @route     GET /api/weather
// @access    Public
const getWeather = asyncWrapper(async (req, res, next) => {
  const weather = await Weather.findAll({
    order: [['createdAt', 'DESC']],
    limit: 1,
  });

  res.status(200).json({
    success: true,
    data: weather,
  });
});

module.exports = getWeather;
