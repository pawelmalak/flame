const asyncWrapper = require('../../middleware/asyncWrapper');
const Category = require('../../models/Category');

// @desc      Reorder categories
// @route     PUT /api/categories/0/reorder
// @access    Public
const reorderCategories = asyncWrapper(async (req, res, next) => {
  req.body.categories.forEach(async ({ id, orderId }) => {
    await Category.update(
      { orderId },
      {
        where: { id },
      }
    );
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = reorderCategories;
