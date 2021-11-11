const asyncWrapper = require('../../middleware/asyncWrapper');
const App = require('../../models/App');
const ErrorResponse = require('../../utils/ErrorResponse');

// @desc      Delete app
// @route     DELETE /api/apps/:id
// @access    Public
const deleteApp = asyncWrapper(async (req, res, next) => {
  if (!req.isAuthenticated) {
    return next(new ErrorResponse('Unauthorized', 401));
  }

  await App.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = deleteApp;
