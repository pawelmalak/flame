const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  reorderCategories
} = require('../controllers/category');

router
  .route('/')
  .post(createCategory)
  .get(getCategories);

router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

router
  .route('/0/reorder')
  .put(reorderCategories);

module.exports = router;