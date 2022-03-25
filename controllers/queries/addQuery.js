const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const File = require('../../utils/File');

// @desc      Add custom search query
// @route     POST /api/queries
// @access    Public
const addQuery = asyncWrapper(async (req, res, next) => {
  const file = new File('data/customQueries.json');
  let content = JSON.parse(file.read());

  const prefixes = content.queries.map((q) => q.prefix);

  if (prefixes.includes(req.body.prefix)) {
    return next(new ErrorResponse('Prefix must be unique', 400));
  }

  // Add new query
  content.queries.push(req.body);
  file.write(content, true);

  res.status(201).json({
    success: true,
    data: req.body,
  });
});

module.exports = addQuery;
