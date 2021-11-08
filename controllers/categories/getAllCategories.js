const asyncWrapper = require('../../middleware/asyncWrapper');
const Category = require('../../models/Category');
const Bookmark = require('../../models/Bookmark');
const { Sequelize } = require('sequelize');
const loadConfig = require('../../utils/loadConfig');

// @desc      Get all categories
// @route     GET /api/categories
// @access    Public
const getAllCategories = asyncWrapper(async (req, res, next) => {
  const { useOrdering: orderType } = await loadConfig();

  let categories;

  if (orderType == 'name') {
    categories = await Category.findAll({
      include: [
        {
          model: Bookmark,
          as: 'bookmarks',
        },
      ],
      order: [[Sequelize.fn('lower', Sequelize.col('Category.name')), 'ASC']],
    });
  } else {
    categories = await Category.findAll({
      include: [
        {
          model: Bookmark,
          as: 'bookmarks',
        },
      ],
      order: [[orderType, 'ASC']],
    });
  }

  res.status(200).json({
    success: true,
    data: categories,
  });
});

module.exports = getAllCategories;
