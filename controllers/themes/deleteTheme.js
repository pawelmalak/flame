const asyncWrapper = require('../../middleware/asyncWrapper');
const File = require('../../utils/File');

// @desc      Delete theme
// @route     DELETE /api/themes/:name
// @access    Public
const deleteTheme = asyncWrapper(async (req, res, next) => {
  const file = new File('data/themes.json');
  let content = JSON.parse(file.read());

  content.themes = content.themes.filter((t) => t.name != req.params.name);
  file.write(content, true);

  const userThemes = content.themes.filter((t) => t.isCustom);

  res.status(200).json({
    success: true,
    data: userThemes,
  });
});

module.exports = deleteTheme;
