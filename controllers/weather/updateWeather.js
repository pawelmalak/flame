const asyncWrapper = require('../../middleware/asyncWrapper');
const getExternalWeather = require('../../utils/getExternalWeather');

// @desc      Update weather
// @route     GET /api/weather/update
// @access    Public
const updateWeather = asyncWrapper(async (req, res, next) => {
  const weather = await getExternalWeather();

  res.status(200).json({
    success: true,
    data: weather,
  });
});

module.exports = updateWeather;
