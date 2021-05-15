const express = require('express');
const router = express.Router();

const {
  createPair,
  getAllPairs,
  getSinglePair,
  updateValue,
  deletePair
} = require('../controllers/config');

router
  .route('')
  .post(createPair)
  .get(getAllPairs);

router
  .route('/:key')
  .get(getSinglePair)
  .put(updateValue)
  .delete(deletePair);

module.exports = router;