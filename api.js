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
api.use('/api/categories', require('./routes/category'));
api.use('/api/bookmarks', require('./routes/bookmark'));

// Custom error handler
api.use(errorHandler);

module.exports = api;