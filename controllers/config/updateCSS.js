const asyncWrapper = require('../../middleware/asyncWrapper');
const File = require('../../utils/File');
const { join } = require('path');
const fs = require('fs');

// @desc      Update custom CSS file
// @route     PUT /api/config/0/css
// @access    Public
const updateCSS = asyncWrapper(async (req, res, next) => {
  const file = new File(join(__dirname, '../../public/flame.css'));
  file.write(req.body.styles, false);

  // Copy file to docker volume
  fs.copyFileSync(
    join(__dirname, '../../public/flame.css'),
    join(__dirname, '../../data/flame.css')
  );

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = updateCSS;
