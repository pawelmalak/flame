const express = require('express');
const router = express.Router();

const {
  createBookmark,
  getBookmarks,
  getBookmark,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmark');

router
  .route('/')
  .post(createBookmark)
  .get(getBookmarks);

router
  .route('/:id')
  .get(getBookmark)
  .put(updateBookmark)
  .delete(deleteBookmark);

module.exports = router;