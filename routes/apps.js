const express = require('express');
const router = express.Router();

// middleware
const { auth, requireAuth, upload } = require('../middleware');

const {
  createApp,
  getAllApps,
  getSingleApp,
  updateApp,
  deleteApp,
  reorderApps,
} = require('../controllers/apps');

router
  .route('/')
  .post(auth, requireAuth, upload.icon, createApp)
  .get(auth, getAllApps);

router
  .route('/:id')
  .get(auth, getSingleApp)
  .put(auth, requireAuth, upload.icon, updateApp)
  .delete(auth, requireAuth, deleteApp);

router.route('/0/reorder').put(auth, requireAuth, reorderApps);

module.exports = router;
