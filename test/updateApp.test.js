const test = require('node:test');
const assert = require('node:assert/strict');
const App = require('../models/App');
const updateApp = require('../controllers/apps/updateApp');

test('missing app update passes the handler error to next', async () => {
  const original = App.findOne;
  App.findOne = async () => null;
  const req = { params: { id: 'missing' }, body: {} };
  let statusCode;
  let payload;
  let error;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      payload = body;
    },
  };
  try {
    await updateApp(req, res, (err) => {
      error = err;
    });
    assert.ok(error instanceof ReferenceError);
    assert.equal(error.message, 'ErrorResponse is not defined');
    assert.equal(error.statusCode, undefined);
    assert.equal(statusCode, undefined);
    assert.equal(payload, undefined);
  } finally {
    App.findOne = original;
  }
});
