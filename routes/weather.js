const express = require('express');
const router = express.Router();

const {
  getWeather, updateWeather
} = require('../controllers/weather');

router
  .route('/')
  .get(getWeather);

router
  .route('/update')
  .get(updateWeather);


module.exports = router;