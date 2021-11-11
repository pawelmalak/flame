const asyncWrapper = require('../../middleware/asyncWrapper');
const App = require('../../models/App');
const ErrorResponse = require('../../utils/ErrorResponse');

// @desc      Update app
// @route     PUT /api/apps/:id
// @access    Public
const updateApp = asyncWrapper(async (req, res, next) => {
  if (!req.isAuthenticated) {
    return next(new ErrorResponse('Unauthorized', 401));
  }

  let app = await App.findOne({
    where: { id: req.params.id },
  });

  if (!app) {
    return next(
      new ErrorResponse(
        `App with the id of ${req.params.id} was not found`,
        404
      )
    );
  }

  let _body = { ...req.body };

  if (req.file) {
    _body.icon = req.file.filename;
  }

  app = await app.update(_body);

  res.status(200).json({
    success: true,
    data: app,
  });
});

module.exports = updateApp;
