const express = require('express');
const router = express.Router();

// middleware
const { auth, requireAuth, requireBody } = require('../middleware');

const {
  getThemes,
  addTheme,
  deleteTheme,
  updateTheme,
} = require('../controllers/themes/');

router
  .route('/')
  .get(getThemes)
  .post(
    auth,
    requireAuth,
    requireBody(['name', 'colors', 'isCustom']),
    addTheme
  );

router
  .route('/:name')
  .delete(auth, requireAuth, deleteTheme)
  .put(auth, requireAuth, updateTheme);

module.exports = router;
