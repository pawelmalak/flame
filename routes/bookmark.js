const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const {
  createBookmark,
  getBookmarks,
  getBookmark,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmark');

router
  .route('/')
  .post(upload, createBookmark)
  .get(getBookmarks);

router
  .route('/:id')
  .get(getBookmark)
  .put(upload, updateBookmark)
  .delete(deleteBookmark);

module.exports = router;