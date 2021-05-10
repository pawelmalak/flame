const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler;