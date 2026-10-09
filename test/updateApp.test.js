const test = require('node:test');
const assert = require('node:assert/strict');
const App = require('../models/App');
const updateApp = require('../controllers/apps/updateApp');

test('missing app update returns not found', async () => {
  const original = App.findOne;
  App.findOne = async () => null;
  const req = { params: { id: 'missing' }, body: {} };
  let error;
  try {
    await updateApp(req, { status() { return this; }, json() {} }, (err) => {
      error = err;
    });
    assert.ok(error);
    assert.equal(error.statusCode, 404);
    assert.match(error.message, /was not found/);
  } finally {
    App.findOne = original;
  }
});
