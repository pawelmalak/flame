const test = require('node:test');
const assert = require('node:assert/strict');
const login = require('../controllers/auth/login');

test('bad password does not authenticate', async () => {
  const previous = process.env.PASSWORD;
  process.env.PASSWORD = 'expected-password';
  let statusCode;
  let payload;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      payload = body;
    },
  };
  let error;
  try {
    await login(
      { body: { password: 'other-password', duration: '1d' } },
      res,
      (err) => {
        error = err;
      }
    );
    assert.equal(error.statusCode, 401);
    assert.equal(error.message, 'Invalid credentials');
    assert.equal(statusCode, undefined);
    assert.equal(payload, undefined);
  } finally {
    if (previous === undefined) delete process.env.PASSWORD;
    else process.env.PASSWORD = previous;
  }
});
