const client = require('openid-client');
const asyncWrapper = require('../../../middleware/asyncWrapper');
const getOidcConfig = require('../../../utils/getOidcConfig');

// @desc      Start OIDC login (redirect to Kanidm)
// @route     GET /api/auth/oidc/login
// @access    Public (guarded by requireOidc)
const login = asyncWrapper(async (req, res, next) => {
  const config = await getOidcConfig();

  const codeVerifier = client.randomPKCECodeVerifier();
  const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);
  const state = client.randomState();

  // Store verifier/state in a short-lived signed cookie so the
  // callback request can complete the exchange. Cleared on use.
  res.cookie('oidc_verifier', codeVerifier, {
    httpOnly: true,
    signed: true,
    maxAge: 5 * 60 * 1000,
    sameSite: 'lax',
  });
  res.cookie('oidc_state', state, {
    httpOnly: true,
    signed: true,
    maxAge: 5 * 60 * 1000,
    sameSite: 'lax',
  });

  const authUrl = client.buildAuthorizationUrl(config, {
    redirect_uri: process.env.OIDC_REDIRECT_URI,
    scope: 'openid profile email',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state,
  });

  res.redirect(authUrl.href);
});

module.exports = login;
