const asyncWrapper = require('../../middleware/asyncWrapper');
const loadConfig = require('../../utils/loadConfig');

// @desc      Get config
// @route     GET /api/config
// @access    Public
const getConfig = asyncWrapper(async (req, res, next) => {
  const config = await loadConfig();

  res.status(200).json({
    success: true,
    data: config,
  });
});

module.exports = getConfig;
