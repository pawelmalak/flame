const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const File = require('../../utils/File');

// @desc      Create new theme
// @route     POST /api/themes
// @access    Private
const addTheme = asyncWrapper(async (req, res, next) => {
  const file = new File('data/themes.json');
  let content = JSON.parse(file.read());

  const themeNames = content.themes.map((t) => t.name);

  if (themeNames.includes(req.body.name)) {
    return next(new ErrorResponse('Name must be unique', 400));
  }

  // Add new theme
  content.themes.push(req.body);
  file.write(content, true);

  res.status(201).json({
    success: true,
    data: req.body,
  });
});

module.exports = addTheme;
