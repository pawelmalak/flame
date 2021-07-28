const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const App = require('../models/App');
const Config = require('../models/Config');
const { Sequelize } = require('sequelize');

// @desc      Create new app
// @route     POST /api/apps
// @access    Public
exports.createApp = asyncWrapper(async (req, res, next) => {
  // Get config from database
  const pinApps = await Config.findOne({
    where: { key: 'pinAppsByDefault' }
  });

  let app;
  let _body = { ...req.body };

  if (req.file) {
    _body.icon = req.file.filename;
  }

  if (pinApps) {
    if (parseInt(pinApps.value)) {
      app = await App.create({
        ..._body,
        isPinned: true
      })
    } else {
      app = await App.create(req.body);
    }
  }

  res.status(201).json({
    success: true,
    data: app
  })
})

// @desc      Get all apps
// @route     GET /api/apps
// @access    Public
exports.getApps = asyncWrapper(async (req, res, next) => {
  // Get config from database
  const useOrdering = await Config.findOne({
    where: { key: 'useOrdering' }
  });

  const orderType = useOrdering ? useOrdering.value : 'createdAt';
  let apps;

  if (orderType == 'name') {
    apps = await App.findAll({
      order: [[ Sequelize.fn('lower', Sequelize.col('name')), 'ASC' ]]
    });
  } else {
    apps = await App.findAll({
      order: [[ orderType, 'ASC' ]]
    });
  }

  res.status(200).json({
    success: true,
    data: apps
  })
})

// @desc      Get single app
// @route     GET /api/apps/:id
// @access    Public
exports.getApp = asyncWrapper(async (req, res, next) => {
  const app = await App.findOne({
    where: { id: req.params.id }
  });

  if (!app) {
    return next(new ErrorResponse(`App with id of ${req.params.id} was not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: app
  })
})

// @desc      Update app
// @route     PUT /api/apps/:id
// @access    Public
exports.updateApp = asyncWrapper(async (req, res, next) => {
  let app = await App.findOne({
    where: { id: req.params.id }
  });

  if (!app) {
    return next(new ErrorResponse(`App with id of ${req.params.id} was not found`, 404));
  }

  let _body = { ...req.body };

  if (req.file) {
    _body.icon = req.file.filename;
  }

  app = await app.update(_body);

  res.status(200).json({
    success: true,
    data: app
  })
})

// @desc      Delete app
// @route     DELETE /api/apps/:id
// @access    Public
exports.deleteApp = asyncWrapper(async (req, res, next) => {
  await App.destroy({
    where: { id: req.params.id }
  })

  res.status(200).json({
    success: true,
    data: {}
  })
})

// @desc      Reorder apps
// @route     PUT /api/apps/0/reorder
// @access    Public
exports.reorderApps = asyncWrapper(async (req, res, next) => {
  req.body.apps.forEach(async ({ id, orderId }) => {
    await App.update({ orderId }, {
      where: { id }
    })
  })

  res.status(200).json({
    success: true,
    data: {}
  })
})