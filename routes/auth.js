const express = require('express');
const router = express.Router();

const { login, validate } = require('../controllers/auth');
const requireBody = require('../middleware/requireBody');

router.route('/').post(requireBody(['password', 'duration']), login);

router.route('/validate').post(requireBody(['token']), validate);

module.exports = router;
