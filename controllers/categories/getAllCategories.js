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

  // categories visibility
  const where = req.isAuthenticated ? {} : { isPublic: true };

  if (orderType == 'name') {
    categories = await Category.findAll({
      include: [
        {
          model: Bookmark,
          as: 'bookmarks',
          where,
        },
      ],
      order: [[Sequelize.fn('lower', Sequelize.col('Category.name')), 'ASC']],
      where,
    });
  } else {
    categories = await Category.findAll({
      include: [
        {
          model: Bookmark,
          as: 'bookmarks',
          where,
        },
      ],
      order: [[orderType, 'ASC']],
      where,
    });
  }

  res.status(200).json({
    success: true,
    data: categories,
  });
});

module.exports = getAllCategories;
