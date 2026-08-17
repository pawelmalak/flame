const asyncWrapper = require('../../middleware/asyncWrapper');
const loadConfig = require('../../utils/loadConfig');

// @desc      Get config
// @route     GET /api/config
// @access    Public
const getConfig = asyncWrapper(async (req, res, next) => {
  const config = await loadConfig();

  const isOidcEnabled = Boolean(
    process.env.OIDC_ISSUER &&
      process.env.OIDC_CLIENT_ID &&
      process.env.OIDC_CLIENT_SECRET
  );

  res.status(200).json({
    success: true,
    data: { ...config, isOidcEnabled },
  });
});

module.exports = getConfig;
