const asyncWrapper = require('../../middleware/asyncWrapper');
const App = require('../../models/App');

// @desc      Reorder apps
// @route     PUT /api/apps/0/reorder
// @access    Public
const reorderApps = asyncWrapper(async (req, res, next) => {
  req.body.apps.forEach(async ({ id, orderId }) => {
    await App.update(
      { orderId },
      {
        where: { id },
      }
    );
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = reorderApps;
