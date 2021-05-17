const express = require('express');
const router = express.Router();

const {
  getWeather
} = require('../controllers/weather');

router
  .route('')
  .get(getWeather);

module.exports = router;