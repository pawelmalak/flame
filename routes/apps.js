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
  getFavicon,
} = require('../controllers/apps');

router
  .route('/')
  .post(auth, requireAuth, upload, createApp)
  .get(auth, getAllApps);

router
  .route('/favicon')
  .get(auth, requireAuth, getFavicon);

router
  .route('/:id')
  .get(auth, getSingleApp)
  .put(auth, requireAuth, upload, updateApp)
  .delete(auth, requireAuth, deleteApp);

router.route('/0/reorder').put(auth, requireAuth, reorderApps);

module.exports = router;
