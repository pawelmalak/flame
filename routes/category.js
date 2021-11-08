const express = require('express');
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} = require('../controllers/categories');

router.route('/').post(createCategory).get(getAllCategories);

router
  .route('/:id')
  .get(getSingleCategory)
  .put(updateCategory)
  .delete(deleteCategory);

router.route('/0/reorder').put(reorderCategories);

module.exports = router;
