
const { join } = require('path');
const express = require('express');
const { registerRoutes } = require('./routes');
const { errorHandler } = require('./middleware');
const ziti = require('@openziti/ziti-sdk-nodejs');
const zitiServiceName = process.env.ZITI_SERVICE_NAME || 'flamez';
const zitiIdentityFile = process.env.ZITI_IDENTITY_FILE;

if ((typeof zitiIdentityFile !== 'undefined') && (typeof zitiServiceName !== 'undefined')) {
    ziti.init( zitiIdentityFile ).catch(( err ) => { process.exit(); });  // Authenticate ourselves onto the Ziti network using the specified identity file
}

var api;
if ((typeof zitiIdentityFile !== 'undefined') && (typeof zitiServiceName !== 'undefined')) {
  const api = ziti.express( express, zitiServiceName );    // using OpenZiti overlay networking
} else {
  const api = express();                                   // using underlay networking
}

registerRoutes(api);
// Static files
api.use(express.static(join(__dirname, 'public')));
api.use('/uploads', express.static(join(__dirname, 'data/uploads')));
api.get(/^\/(?!api)/, (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
});

// Body parser
api.use(express.json());

// Link controllers with routes
api.use('/api/apps', require('./routes/apps'));
api.use('/api/config', require('./routes/config'));
api.use('/api/weather', require('./routes/weather'));
api.use('/api/categories', require('./routes/category'));
api.use('/api/bookmarks', require('./routes/bookmark'));
api.use('/api/queries', require('./routes/queries'));
api.use('/api/auth', require('./routes/auth'));
api.use('/api/themes', require('./routes/themes'));

// Custom error handler
api.use(errorHandler);

module.exports = api;
