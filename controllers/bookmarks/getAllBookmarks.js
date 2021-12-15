const asyncWrapper = require('../../middleware/asyncWrapper');
const Bookmark = require('../../models/Bookmark');
const { Sequelize } = require('sequelize');
const loadConfig = require('../../utils/loadConfig');

// @desc      Get all bookmarks
// @route     GET /api/bookmarks
// @access    Public
const getAllBookmarks = asyncWrapper(async (req, res, next) => {
  const { useOrdering: orderType } = await loadConfig();

  // bookmarks visibility
  const where = req.isAuthenticated ? {} : { isPublic: true };

  const order =
    orderType == 'name'
      ? [[Sequelize.fn('lower', Sequelize.col('name')), 'ASC']]
      : [[orderType, 'ASC']];

  const bookmarks = await Bookmark.findAll({
    order,
    where,
  });

  res.status(200).json({
    success: true,
    data: bookmarks,
  });
});

module.exports = getAllBookmarks;
