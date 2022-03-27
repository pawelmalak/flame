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
  reorderBookmarks,
  importBookmark,
} = require('../controllers/bookmarks');

const { getAllCategories } = require('../controllers/categories');

router
  .route('/')
  .post(auth, requireAuth, upload.icon, createBookmark)
  .get(auth, getAllBookmarks);

router
  .route('/:id')
  .get(auth, getSingleBookmark)
  .put(auth, requireAuth, upload.icon, updateBookmark)
  .delete(auth, requireAuth, deleteBookmark);

router
  .route('/import')
  .post(auth, requireAuth, upload.bookmark, importBookmark, getAllCategories);

router.route('/0/reorder').put(auth, requireAuth, reorderBookmarks);

module.exports = router;
