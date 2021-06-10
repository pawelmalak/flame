const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const apiProxy = createProxyMiddleware('/api', {
    target: 'http://localhost:5005'
  })

  const wsProxy = createProxyMiddleware('/socket', {
    target: 'http://localhost:5005',
    ws: true
  })

  app.use(apiProxy);
  app.use(wsProxy);
};