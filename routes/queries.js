const express = require('express');
const router = express.Router();

// middleware
const { auth, requireAuth } = require('../middleware');

const {
  getQueries,
  addQuery,
  deleteQuery,
  updateQuery,
} = require('../controllers/queries/');

router.route('/').post(auth, requireAuth, addQuery).get(getQueries);
router
  .route('/:prefix')
  .delete(auth, requireAuth, deleteQuery)
  .put(auth, requireAuth, updateQuery);

module.exports = router;
