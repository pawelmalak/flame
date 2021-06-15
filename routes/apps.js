const express = require('express');
const router = express.Router();

const {
  createApp,
  getApps,
  getApp,
  updateApp,
  deleteApp,
  reorderApps
} = require('../controllers/apps');

router
  .route('/')
  .post(createApp)
  .get(getApps);

router
  .route('/:id')
  .get(getApp)
  .put(updateApp)
  .delete(deleteApp);

router
  .route('/0/reorder')
  .put(reorderApps);

module.exports = router;