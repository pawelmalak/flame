const asyncWrapper = require('../../middleware/asyncWrapper');
const App = require('../../models/App');
const ErrorResponse = require('../../utils/ErrorResponse');

// @desc      Get single app
// @route     GET /api/apps/:id
// @access    Public
const getSingleApp = asyncWrapper(async (req, res, next) => {
  const visibility = req.isAuthenticated ? {} : { isPublic: true };

  const app = await App.findOne({
    where: { id: req.params.id, ...visibility },
  });

  if (!app) {
    return next(
      new ErrorResponse(
        `App with the id of ${req.params.id} was not found`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: app,
  });
});

module.exports = getSingleApp;
