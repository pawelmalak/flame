const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const {
  createBookmark,
  getAllBookmarks,
  getSingleBookmark,
  updateBookmark,
  deleteBookmark,
} = require('../controllers/bookmarks');

router.route('/').post(upload, createBookmark).get(getAllBookmarks);

router
  .route('/:id')
  .get(getSingleBookmark)
  .put(upload, updateBookmark)
  .delete(deleteBookmark);

module.exports = router;
