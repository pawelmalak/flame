const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Category = require('../models/Category');
const Bookmark = require('../models/Bookmark');

// @desc      Create new category
// @route     POST /api/categories
// @access    Public
exports.createCategory = asyncWrapper(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category
  })
})

// @desc      Get all categories
// @route     GET /api/categories
// @access    Public
exports.getCategories = asyncWrapper(async (req, res, next) => {
  const categories = await Category.findAll({
    include: [{
      model: Bookmark,
      as: 'bookmarks'
    }],
    order: [['name', 'ASC']]
  });

  res.status(200).json({
    success: true,
    data: categories
  })
})

// @desc      Get single category
// @route     GET /api/categories/:id
// @access    Public
exports.getCategory = asyncWrapper(async (req, res, next) => {
  const category = await Category.findOne({
    where: { id: req.params.id },
    include: [{
      model: Bookmark,
      as: 'bookmarks'
    }]
  });

  if (!category) {
    return next(new ErrorResponse(`Category with id of ${req.params.id} was not found`, 404))
  }

  res.status(200).json({
    success: true,
    data: category
  })
})

// @desc      Update category
// @route     PUT /api/categories/:id
// @access    Public
exports.updateCategory = asyncWrapper(async (req, res, next) => {
  let category = await Category.findOne({
    where: { id: req.params.id }
  });

  if (!category) {
    return next(new ErrorResponse(`Category with id of ${req.params.id} was not found`, 404))
  }

  category = await category.update({ ...req.body });

  res.status(200).json({
    success: true,
    data: category
  })
})

// @desc      Delete category
// @route     DELETE /api/categories/:id
// @access    Public
exports.deleteCategory = asyncWrapper(async (req, res, next) => {
  await Category.destroy({
    where: { id: req.params.id }
  })

  res.status(200).json({
    success: true,
    data: {}
  })
})