const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
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

module.exports = router;