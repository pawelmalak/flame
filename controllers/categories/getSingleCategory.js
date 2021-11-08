const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const Category = require('../../models/Category');
const Bookmark = require('../../models/Bookmark');

// @desc      Get single category
// @route     GET /api/categories/:id
// @access    Public
const getSingleCategory = asyncWrapper(async (req, res, next) => {
  const category = await Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Bookmark,
        as: 'bookmarks',
      },
    ],
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
