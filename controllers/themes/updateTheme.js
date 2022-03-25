const asyncWrapper = require('../../middleware/asyncWrapper');
const File = require('../../utils/File');

// @desc      Update theme
// @route     PUT /api/themes/:name
// @access    Public
const updateTheme = asyncWrapper(async (req, res, next) => {
  const file = new File('data/themes.json');
  let content = JSON.parse(file.read());

  let themeIdx = content.themes.findIndex((t) => t.name == req.params.name);

  // theme found
  if (themeIdx > -1) {
    content.themes = [
      ...content.themes.slice(0, themeIdx),
      req.body,
      ...content.themes.slice(themeIdx + 1),
    ];
  }

  file.write(content, true);

  const userThemes = content.themes.filter((t) => t.isCustom);

  res.status(200).json({
    success: true,
    data: userThemes,
  });
});

module.exports = updateTheme;
