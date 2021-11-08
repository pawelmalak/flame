const asyncWrapper = require('../../middleware/asyncWrapper');
const File = require('../../utils/File');

// @desc      Get custom queries file
// @route     GET /api/queries
// @access    Public
const getQueries = asyncWrapper(async (req, res, next) => {
  const file = new File('data/customQueries.json');
  const content = JSON.parse(file.read());

  res.status(200).json({
    success: true,
    data: content.queries,
  });
});

module.exports = getQueries;
