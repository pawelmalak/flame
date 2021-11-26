const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const Category = require('../../models/Category');
const Bookmark = require('../../models/Bookmark');
const { Sequelize } = require('sequelize');
const loadConfig = require('../../utils/loadConfig');

// @desc      Get single category
// @route     GET /api/categories/:id
// @access    Public
const getSingleCategory = asyncWrapper(async (req, res, next) => {
  const { useOrdering: orderType } = await loadConfig();

  const visibility = req.isAuthenticated ? {} : { isPublic: true };

  const order =
    orderType == 'name'
      ? [[Sequelize.fn('lower', Sequelize.col('bookmarks.name')), 'ASC']]
      : [[{ model: Bookmark, as: 'bookmarks' }, orderType, 'ASC']];

  const category = await Category.findOne({
    where: { id: req.params.id, ...visibility },
    include: [
      {
        model: Bookmark,
        as: 'bookmarks',
        where: visibility,
      },
    ],
    order,
  });

  if (!category) {
    return next(
      new ErrorResponse(
        `Category with id of ${req.params.id} was not found`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

module.exports = getSingleCategory;
