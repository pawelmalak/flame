const client = require('openid-client');

let configPromise = null;

// Discovers and caches the Kanidm OIDC configuration.
// Only called when requireOidc middleware has already confirmed
// the required env vars are set.
const getOidcConfig = () => {
  if (!configPromise) {
    configPromise = client.discovery(
      new URL(process.env.OIDC_ISSUER),
      process.env.OIDC_CLIENT_ID,
      process.env.OIDC_CLIENT_SECRET
    );
  }

  return configPromise;
};

module.exports = getOidcConfig;
