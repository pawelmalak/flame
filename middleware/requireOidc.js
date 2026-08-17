const ErrorResponse = require('../utils/ErrorResponse');

// Blocks OIDC routes unless all required env vars are set.
// Keeps the feature fully optional - if unconfigured, these
// routes behave as if they don't exist.
const requireOidc = (req, res, next) => {
  const isOidcEnabled = Boolean(
    process.env.OIDC_ISSUER &&
      process.env.OIDC_CLIENT_ID &&
      process.env.OIDC_CLIENT_SECRET
  );

  if (!isOidcEnabled) {
    return next(new ErrorResponse('OIDC is not enabled', 404));
  }

  next();
};

module.exports = requireOidc;
