const express = require('express');
const router = express.Router();

// middleware
const { auth, requireAuth } = require('../middleware');

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} = require('../controllers/categories');

router
  .route('/')
  .post(auth, requireAuth, createCategory)
  .get(auth, getAllCategories);

router
  .route('/:id')
  .get(auth, getSingleCategory)
  .put(auth, requireAuth, updateCategory)
  .delete(auth, requireAuth, deleteCategory);

router.route('/0/reorder').put(auth, requireAuth, reorderCategories);

module.exports = router;
