const express = require('express');
const router = express.Router();

const { login, validate, oidcLogin, oidcCallback } = require('../controllers/auth');
const requireBody = require('../middleware/requireBody');
const requireOidc = require('../middleware/requireOidc');

router.route('/').post(requireBody(['password', 'duration']), login);

router.route('/validate').post(requireBody(['token']), validate);

router.route('/oidc/login').get(requireOidc, oidcLogin);

router.route('/oidc/callback').get(requireOidc, oidcCallback);

module.exports = router;
