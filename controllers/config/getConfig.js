const asyncWrapper = require('../../middleware/asyncWrapper');
const loadConfig = require('../../utils/loadConfig');

// Keys that belong to the instance owner only. The public dashboard needs the
// layout and feature flags, not the owner's WeatherAPI key or the Docker host.
const PRIVATE_CONFIG_KEYS = ['WEATHER_API_KEY', 'dockerHost'];

// @desc      Get config
// @route     GET /api/config
// @access    Public
const getConfig = asyncWrapper(async (req, res, next) => {
  const config = await loadConfig();

  if (!req.isAuthenticated) {
    PRIVATE_CONFIG_KEYS.forEach((key) => delete config[key]);
  }

  res.status(200).json({
    success: true,
    data: config,
  });
});

module.exports = getConfig;
