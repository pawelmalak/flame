const client = require('openid-client');
const asyncWrapper = require('../../../middleware/asyncWrapper');
const ErrorResponse = require('../../../utils/ErrorResponse');
const getOidcConfig = require('../../../utils/getOidcConfig');
const signToken = require('../../../utils/signToken');

// @desc      Complete OIDC login (Kanidm redirects here)
// @route     GET /api/auth/oidc/callback
// @access    Public (guarded by requireOidc)
const callback = asyncWrapper(async (req, res, next) => {
  const { oidc_verifier: codeVerifier, oidc_state: expectedState } =
    req.signedCookies;

  // Clear the short-lived cookies regardless of outcome
  res.clearCookie('oidc_verifier');
  res.clearCookie('oidc_state');

  if (!codeVerifier || !expectedState) {
    return next(new ErrorResponse('OIDC session expired', 400));
  }

  const config = await getOidcConfig();

  const currentUrl = new URL(
    req.originalUrl,
    process.env.OIDC_REDIRECT_URI
  );

  let tokens;
  try {
    tokens = await client.authorizationCodeGrant(config, currentUrl, {
      pkceCodeVerifier: codeVerifier,
      expectedState,
    });
  } catch (err) {
    return next(new ErrorResponse('OIDC authentication failed', 401));
  }

  // ID token has already been validated (signature, issuer,
  // audience, expiry) by authorizationCodeGrant.
  void tokens.claims();

  const flameToken = signToken('14d');

  res.redirect(`/?oidc_token=${flameToken}`);
});

module.exports = callback;
