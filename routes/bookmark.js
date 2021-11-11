const express = require('express');
const router = express.Router();

// middleware
const { upload, auth, requireAuth } = require('../middleware');

const {
  createBookmark,
  getAllBookmarks,
  getSingleBookmark,
  updateBookmark,
  deleteBookmark,
} = require('../controllers/bookmarks');

router
  .route('/')
  .post(auth, requireAuth, upload, createBookmark)
  .get(auth, getAllBookmarks);

router
  .route('/:id')
  .get(auth, getSingleBookmark)
  .put(auth, requireAuth, upload, updateBookmark)
  .delete(auth, requireAuth, deleteBookmark);

module.exports = router;
