const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const {
  createApp,
  getAllApps,
  getSingleApp,
  updateApp,
  deleteApp,
  reorderApps,
} = require('../controllers/apps');

router.route('/').post(upload, createApp).get(getAllApps);

router.route('/:id').get(getSingleApp).put(upload, updateApp).delete(deleteApp);

router.route('/0/reorder').put(reorderApps);

module.exports = router;
