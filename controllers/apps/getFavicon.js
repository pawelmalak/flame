const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const { resolveFavicon, saveFavicon, normalizeBase } = require('../../utils/favicon');

// @desc      Download favicon for a URL and store it as an app/bookmark icon
// @route     GET /api/apps/favicon?url=...
// @access    Private
const getFavicon = asyncWrapper(async (req, res, next) => {
  const { url } = req.query;

  if (!url) {
    return next(new ErrorResponse('url query param is required', 400));
  }

  // validate normalized URL
  try {
    normalizeBase(url);
  } catch (err) {
    return next(new ErrorResponse('Invalid URL', 400));
  }

  let buffer, ext;
  try {
    const resolved = await resolveFavicon(url);
    buffer = resolved.buffer;
    ext = resolved.ext;
  } catch (err) {
    return next(new ErrorResponse(err.message || 'Favicon not found', 404));
  }

  const filename = saveFavicon(buffer, ext);

  res.status(200).json({
    success: true,
    data: { filename },
  });
});

module.exports = getFavicon;