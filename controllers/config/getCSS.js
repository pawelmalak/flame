const asyncWrapper = require('../../middleware/asyncWrapper');
const File = require('../../utils/File');
const { join } = require('path');

// @desc      Get custom CSS file
// @route     GET /api/config/0/css
// @access    Public
const getCSS = asyncWrapper(async (req, res, next) => {
  const file = new File(join(__dirname, '../../public/flame.css'));
  const content = file.read();

  res.status(200).json({
    success: true,
    data: content,
  });
});

module.exports = getCSS;
