const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const Category = require('../../models/Category');
const Bookmark = require('../../models/Bookmark');

// @desc      Delete category
// @route     DELETE /api/categories/:id
// @access    Public
const deleteCategory = asyncWrapper(async (req, res, next) => {
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

  category.bookmarks.forEach(async (bookmark) => {
    await Bookmark.destroy({
      where: { id: bookmark.id },
    });
  });

  await Category.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = deleteCategory;
