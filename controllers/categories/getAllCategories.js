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
  let output;

  // categories visibility
  const where = req.isAuthenticated ? {} : { isPublic: true };

  const order =
    orderType == 'name'
      ? [
          [Sequelize.fn('lower', Sequelize.col('Category.name')), 'ASC'],
          [Sequelize.fn('lower', Sequelize.col('bookmarks.name')), 'ASC'],
        ]
      : [
          [orderType, 'ASC'],
          [{ model: Bookmark, as: 'bookmarks' }, orderType, 'ASC'],
        ];

  categories = categories = await Category.findAll({
    include: [
      {
        model: Bookmark,
        as: 'bookmarks',
      },
    ],
    order,
    where,
  });

  if (req.isAuthenticated) {
    output = categories;
  } else {
    // filter out private bookmarks
    output = categories.map((c) => c.get({ plain: true }));
    output = output.map((c) => ({
      ...c,
      bookmarks: c.bookmarks.filter((b) => b.isPublic),
    }));
  }

  res.status(200).json({
    success: true,
    data: output,
  });
});

module.exports = getAllCategories;
