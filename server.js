const express = require('express');
const { connectDB } = require('./db');
const errorHandler = require('./middleware/errorHandler');
const jobs = require('./utils/jobs');
const colors = require('colors');
require('dotenv').config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5005;

app.get('/', (req, res) => {
  res.send('Server is working');
})

// Body parser
app.use(express.json());

// Link controllers with routes
app.use('/api/apps', require('./routes/apps'));
app.use('/api/config', require('./routes/config'));
app.use('/api/weather', require('./routes/weather'));

// Custom error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold);
})