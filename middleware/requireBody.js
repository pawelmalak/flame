const ErrorResponse = require('../utils/ErrorResponse');

const requireBody = (keys) => (req, res, next) => {
  const missing = keys.filter((key) => !Object.keys(req.body).includes(key));

  if (missing.length) {
    return next(new ErrorResponse(`'${missing[0]}' is required`, 400));
  }

  next();
};

module.exports = requireBody;
