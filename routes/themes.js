const express = require('express');
const router = express.Router();

// middleware
const { auth, requireAuth, requireBody } = require('../middleware');

const { getThemes, addTheme } = require('../controllers/themes/');

router
  .route('/')
  .get(getThemes)
  .post(
    auth,
    requireAuth,
    requireBody(['name', 'colors', 'isCustom']),
    addTheme
  );

module.exports = router;
