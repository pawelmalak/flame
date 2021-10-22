const asyncWrapper = require('../../middleware/asyncWrapper');
const Bookmark = require('../../models/Bookmark');

// @desc      Delete bookmark
// @route     DELETE /api/bookmarks/:id
// @access    Public
const deleteBookmark = asyncWrapper(async (req, res, next) => {
  await Bookmark.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = deleteBookmark;
