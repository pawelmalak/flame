const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Weather = require('../models/Weather');

// @desc      Get latest weather status
// @route     POST /api/weather
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