const asyncWrapper = require('../../middleware/asyncWrapper');
const File = require('../../utils/File');
const { join } = require('path');

const QUERIES_PATH = join(__dirname, '../../data/customQueries.json');

// @desc      Add custom search query
// @route     POST /api/queries
// @access    Public
exports.addQuery = asyncWrapper(async (req, res, next) => {
  const file = new File(QUERIES_PATH);
  let content = JSON.parse(file.read());

  // Add new query
  content.queries.push(req.body);
  file.write(content, true);

  res.status(201).json({
    success: true,
    data: req.body,
  });
});

// @desc      Get custom queries file
// @route     GET /api/queries
// @access    Public
exports.getQueries = asyncWrapper(async (req, res, next) => {
  const file = new File(QUERIES_PATH);
  const content = JSON.parse(file.read());

  res.status(200).json({
    success: true,
    data: content.queries,
  });
});

// @desc      Update query
// @route     PUT /api/queries/:prefix
// @access    Public
exports.updateQuery = asyncWrapper(async (req, res, next) => {
  const file = new File(QUERIES_PATH);
  let content = JSON.parse(file.read());

  let queryIdx = content.queries.findIndex(
    (q) => q.prefix == req.params.prefix
  );

  // query found
  if (queryIdx > -1) {
    content.queries = [
      ...content.queries.slice(0, queryIdx),
      req.body,
      ...content.queries.slice(queryIdx + 1),
    ];
  }

  file.write(content, true);

  res.status(200).json({
    success: true,
    data: content.queries,
  });
});

// @desc      Delete query
// @route     DELETE /api/queries/:prefix
// @access    Public
exports.deleteQuery = asyncWrapper(async (req, res, next) => {
  const file = new File(QUERIES_PATH);
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
