const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Bookmark = require('../models/Bookmark');
const { Sequelize } = require('sequelize');

// @desc      Create new bookmark
// @route     POST /api/bookmarks
// @access    Public
exports.createBookmark = asyncWrapper(async (req, res, next) => {
  let bookmark;

  let _body = {
    ...req.body,
    categoryId: parseInt(req.body.categoryId)
  };

  if (req.file) {
    _body.icon = req.file.filename;
  }

  bookmark = await Bookmark.create(_body);

  res.status(201).json({
    success: true,
    data: bookmark
  })
})

// @desc      Get all bookmarks
// @route     GET /api/bookmarks
// @access    Public
exports.getBookmarks = asyncWrapper(async (req, res, next) => {
  const bookmarks = await Bookmark.findAll({
    order: [[ Sequelize.fn('lower', Sequelize.col('name')), 'ASC' ]]
  });

  res.status(200).json({
    success: true,
    data: bookmarks
  })
})

// @desc      Get single bookmark
// @route     GET /api/bookmarks/:id
// @access    Public
exports.getBookmark = asyncWrapper(async (req, res, next) => {
  const bookmark = await Bookmark.findOne({
    where: { id: req.params.id }
  });

  if (!bookmark) {
    return next(new ErrorResponse(`Bookmark with id of ${req.params.id} was not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: bookmark
  })
})

// @desc      Update bookmark
// @route     PUT /api/bookmarks/:id
// @access    Public
exports.updateBookmark = asyncWrapper(async (req, res, next) => {
  let bookmark = await Bookmark.findOne({
    where: { id: req.params.id }
  });

  if (!bookmark) {
    return next(new ErrorResponse(`Bookmark with id of ${req.params.id} was not found`, 404));
  }

  let _body = {
    ...req.body,
    categoryId: parseInt(req.body.categoryId)
  };

  if (req.file) {
    _body.icon = req.file.filename;
  }

  bookmark = await bookmark.update(_body);

  res.status(200).json({
    success: true,
    data: bookmark
  })
})

// @desc      Delete bookmark
// @route     DELETE /api/bookmarks/:id
// @access    Public
exports.deleteBookmark = asyncWrapper(async (req, res, next) => {
  await Bookmark.destroy({
    where: { id: req.params.id }
  });

  res.status(200).json({
    success: true,
    data: {}
  })
})