const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const importBookmarkData = require('../../utils/importBookmark');
const Bookmark = require('../../models/Bookmark');

// @desc      Import bookmarks from file.
// @route     POST /api/bookmarks/import
// @access    Public
const importBookmark = asyncWrapper(async (req, res, next) => {
  importBookmarkData(req.file.path);

  if(next){
    next();
  } else {
    res.status(200).json({
      success: true,
      data: bookmark,
    });
  }
});

module.exports = importBookmark;
