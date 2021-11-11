const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');

const {
  createApp,
  getAllApps,
  getSingleApp,
  updateApp,
  deleteApp,
  reorderApps,
} = require('../controllers/apps');

router.route('/').post(auth, upload, createApp).get(auth, getAllApps);

router
  .route('/:id')
  .get(auth, getSingleApp)
  .put(auth, upload, updateApp)
  .delete(auth, deleteApp);

router.route('/0/reorder').put(auth, reorderApps);

module.exports = router;
