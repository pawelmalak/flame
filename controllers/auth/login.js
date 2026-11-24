const crypto = require('crypto');

const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const signToken = require('../../utils/signToken');

// Passwords that shipped in the repository or the Docker image. A deployment
// still using one of them is not authenticated in any meaningful sense.
const PUBLISHED_PASSWORDS = ['change_me', 'flame_password'];

const safeEqual = (a, b) => {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
};

// @desc      Login user
// @route     POST /api/auth/
// @access    Public
const login = asyncWrapper(async (req, res, next) => {
  const { password, duration } = req.body;

  const expected = process.env.PASSWORD;

  if (!expected || PUBLISHED_PASSWORDS.includes(expected)) {
    return next(
      new ErrorResponse(
        'PASSWORD is not configured; set a unique value before starting Flame',
        500
      )
    );
  }

  // Strict, constant-time comparison. The previous `==` let an unset PASSWORD
  // authenticate any request whose password was absent (undefined == null).
  if (typeof password !== 'string' || !safeEqual(password, expected)) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = signToken(duration);

  res.status(200).json({
    success: true,
    data: { token },
  });
});

module.exports = login;
