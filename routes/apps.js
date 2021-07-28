const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

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
  .post(upload, createApp)
  .get(getApps);

router
  .route('/:id')
  .get(getApp)
  .put(upload, updateApp)
  .delete(deleteApp);

router
  .route('/0/reorder')
  .put(reorderApps);

module.exports = router;