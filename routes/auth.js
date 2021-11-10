const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth');
const requireBody = require('../middleware/requireBody');

router.route('/').post(requireBody(['password', 'duration']), login);

module.exports = router;
