const ErrorResponse = require('../utils/ErrorResponse');
const colors = require('colors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (error.errors[0].type === 'unique violation') {
    const msg = error.errors[0].message;
    error = new ErrorResponse(`Field ${msg}`, 400);
  }

  console.log(error);
  console.log(`${err}`.bgRed);

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler;