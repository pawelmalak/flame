const asyncWrapper = require('../../middleware/asyncWrapper');
const App = require('../../models/App');
const loadConfig = require('../../utils/loadConfig');

// @desc      Create new app
// @route     POST /api/apps
// @access    Public
const createApp = asyncWrapper(async (req, res, next) => {
  const { pinAppsByDefault } = await loadConfig();

  let app;
  let _body = { ...req.body };

  if (req.file) {
    _body.icon = req.file.filename;
  }

  if (pinAppsByDefault) {
    app = await App.create({
      ..._body,
      isPinned: true,
    });
  } else {
    app = await App.create(req.body);
  }

  res.status(201).json({
    success: true,
    data: app,
  });
});

module.exports = createApp;
