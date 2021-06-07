const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Weather = require('../models/Weather');
const getExternalWeather = require('../utils/getExternalWeather');

// @desc      Get latest weather status
// @route     GET /api/weather
// @access    Public
exports.getWeather = asyncWrapper(async (req, res, next) => {
  const weather = await Weather.findAll({
    order: [['createdAt', 'DESC']],
    limit: 1
  });

  res.status(200).json({
    success: true,
    data: weather
  })
})

// @desc      Update weather
// @route     GET /api/weather/update
// @access    Public
exports.updateWeather = asyncWrapper(async (req, res, next) => {
  const weather = await getExternalWeather();

  res.status(200).json({
    success: true,
    data: weather
  })
})