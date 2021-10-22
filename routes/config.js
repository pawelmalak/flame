const express = require('express');
const router = express.Router();

const {
  getCSS,
  updateCSS,
  getConfig,
  updateConfig,
} = require('../controllers/config');

router.route('/').get(getConfig).put(updateConfig);

router.route('/0/css').get(getCSS).put(updateCSS);

module.exports = router;
