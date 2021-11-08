const asyncWrapper = require('../../middleware/asyncWrapper');
const Category = require('../../models/Category');
const loadConfig = require('../../utils/loadConfig');

// @desc      Create new category
// @route     POST /api/categories
// @access    Public
const createCategory = asyncWrapper(async (req, res, next) => {
  const { pinCategoriesByDefault: pinCategories } = await loadConfig();

  let category;

  if (pinCategories) {
    category = await Category.create({
      ...req.body,
      isPinned: true,
    });
  } else {
    category = await Category.create(req.body);
  }

  res.status(201).json({
    success: true,
    data: category,
  });
});

module.exports = createCategory;
