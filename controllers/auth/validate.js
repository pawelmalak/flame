const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const jwt = require('jsonwebtoken');

// @desc      Verify token
// @route     POST /api/auth/verify
// @access    Public
const validate = asyncWrapper(async (req, res, next) => {
  try {
    jwt.verify(req.body.token, process.env.SECRET);

    res.status(200).json({
      success: true,
      data: { token: { isValid: true } },
    });
  } catch (err) {
    return next(new ErrorResponse('Token expired', 401));
  }
});

module.exports = validate;
