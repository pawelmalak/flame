const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Config = require('../models/Config');
const { Op } = require('sequelize');
const File = require('../utils/File');
const { join } = require('path');
const fs = require('fs');

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
// @route     GET /api/config?keys=foo,bar,baz
// @access    Public
exports.getAllPairs = asyncWrapper(async (req, res, next) => {
  let pairs;

  if (req.query.keys) {
    // Check for specific keys to get in a single query
    const keys = req.query.keys
      .split(',')
      .map((key) => { return { key } });

    pairs = await Config.findAll({
      where: {
        [Op.or]: keys
      }
    });
  } else {
    // Else get all
    pairs = await Config.findAll();
  }

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

// @desc      Update multiple values
// @route     PUT /api/config/
// @access    Public
exports.updateValues = asyncWrapper(async (req, res, next) => {
  Object.entries(req.body).forEach(async ([key, value]) => {
    await Config.update({ value }, {
      where: { key }
    })
  })
  
  const config = await Config.findAll();

  res.status(200).send({
    success: true,
    data: config
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

// @desc      Get custom CSS file
// @route     GET /api/config/0/css
// @access    Public
exports.getCss = asyncWrapper(async (req, res, next) => {
  const file = new File(join(__dirname, '../public/flame.css'));
  const content = file.read();

  res.status(200).json({
    success: true,
    data: content
  })
})


// @desc      Update custom CSS file
// @route     PUT /api/config/0/css
// @access    Public
exports.updateCss = asyncWrapper(async (req, res, next) => {
  const file = new File(join(__dirname, '../public/flame.css'));
  file.write(req.body.styles);

  // Copy file to docker volume
  fs.copyFileSync(join(__dirname, '../public/flame.css'), join(__dirname, '../data/flame.css'));

  res.status(200).json({
    success: true,
    data: {}
  })
})