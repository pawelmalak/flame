const asyncWrapper = require('../../middleware/asyncWrapper');
const File = require('../../utils/File');

// @desc      Delete query
// @route     DELETE /api/queries/:prefix
// @access    Public
const deleteQuery = asyncWrapper(async (req, res, next) => {
  const file = new File('data/customQueries.json');
  let content = JSON.parse(file.read());

  content.queries = content.queries.filter(
    (q) => q.prefix != req.params.prefix
  );
  file.write(content, true);

  res.status(200).json({
    success: true,
    data: content.queries,
  });
});

module.exports = deleteQuery;
