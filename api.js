const express = require('express');
const errorHandler = require('./middleware/errorHandler');

const api = express();

api.get('/', (req, res) => {
  res.send('Server is working');
})

// Body parser
api.use(express.json());

// Link controllers with routes
api.use('/api/apps', require('./routes/apps'));
api.use('/api/config', require('./routes/config'));
api.use('/api/weather', require('./routes/weather'));

// Custom error handler
api.use(errorHandler);

module.exports = api;