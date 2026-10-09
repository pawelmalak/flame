const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { storedUploadName } = require('../middleware/multer');

const uploadRoot = path.resolve('data/uploads');

function leavesUploadRoot(originalname) {
  const stored = `${Date.now()}--${originalname}`;
  const target = path.resolve(uploadRoot, stored);
  const relative = path.relative(uploadRoot, target);
  return relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative);
}

test('upload filename that leaves data/uploads is rejected', () => {
  const originalname = path.join('..', '..', '..', 'outside.txt');
  assert.equal(leavesUploadRoot(originalname), true);
  assert.throws(
    () => storedUploadName(originalname),
    (error) => error.statusCode === 400 && error.message === 'Invalid upload filename'
  );
});

test('absolute upload filename is rejected', () => {
  const originalname = path.resolve(path.parse(uploadRoot).root, 'outside.txt');
  assert.throws(
    () => storedUploadName(originalname),
    (error) => error.statusCode === 400
  );
});

test('plain upload filename stays inside data/uploads', () => {
  const stored = storedUploadName('icon.png');
  const target = path.resolve(uploadRoot, stored);
  const relative = path.relative(uploadRoot, target);
  assert.equal(relative.startsWith('..'), false);
  assert.equal(path.isAbsolute(relative), false);
});
