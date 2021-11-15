const express = require('express');
const router = express.Router();

// middleware
const { auth, requireAuth } = require('../middleware');

const {
  getCSS,
  updateCSS,
  getConfig,
  updateConfig,
} = require('../controllers/config');

router.route('/').get(getConfig).put(auth, requireAuth, updateConfig);

router.route('/0/css').get(getCSS).put(auth, requireAuth, updateCSS);

module.exports = router;
