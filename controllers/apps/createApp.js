const asyncWrapper = require('../../middleware/asyncWrapper');
const App = require('../../models/App');
const loadConfig = require('../../utils/loadConfig');

// @desc      Create new app
// @route     POST /api/apps
// @access    Public
const createApp = asyncWrapper(async (req, res, next) => {
  const { pinAppsByDefault } = await loadConfig();

  let body = { ...req.body };

  if (body.icon) {
    body.icon = body.icon.trim();
  }

  if (req.file) {
    body.icon = req.file.filename;
  }

  const app = await App.create({
    ...body,
    isPinned: pinAppsByDefault,
  });

  res.status(201).json({
    success: true,
    data: app,
  });
});

module.exports = createApp;
