const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Config = require('../models/Config');

// @desc      Insert new key:value pair
// @route     POST /api/config
// @access    Public
exports.createPair = asyncWrapper(async (req, res, next) => {
  const pair = await Config.create(req.body);

  res.status(201).json({
    success: true,
    data: pair
  })
})

// @desc      Get all key:value pairs
// @route     GET /api/config
// @access    Public
exports.getAllPairs = asyncWrapper(async (req, res, next) => {
  const pairs = await Config.findAll();

  res.status(200).json({
    success: true,
    data: pairs
  })
})

// @desc      Get single key:value pair
// @route     GET /api/config/:key
// @access    Public
exports.getSinglePair = asyncWrapper(async (req, res, next) => {
  const pair = await Config.findOne({
    where: { key: req.params.key }
  });

  if (!pair) {
    return next(new ErrorResponse(`Key ${req.params.key} was not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: pair
  })
})

// @desc      Update value
// @route     PUT /api/config/:key
// @access    Public
exports.updateValue = asyncWrapper(async (req, res, next) => {
  let pair = await Config.findOne({
    where: { key: req.params.key }
  });

  if (!pair) {
    return next(new ErrorResponse(`Key ${req.params.key} was not found`, 404));
  }

  if (pair.isLocked) {
    return next(new ErrorResponse(`Value of key ${req.params.key} is locked and can not be changed`, 400));
  }

  pair = await pair.update({ ...req.body });

  res.status(200).json({
    success: true,
    data: pair
  })
})

// @desc      Delete key:value pair
// @route     DELETE /api/config/:key
// @access    Public
exports.deletePair = asyncWrapper(async (req, res, next) => {
  const pair = await Config.findOne({
    where: { key: req.params.key }
  });

  if (!pair) {
    return next(new ErrorResponse(`Key ${req.params.key} was not found`, 404));
  }

  if (pair.isLocked) {
    return next(new ErrorResponse(`Value of key ${req.params.key} is locked and can not be deleted`, 400));
  }

  await pair.destroy();

  res.status(200).json({
    success: true,
    data: {}
  })
})