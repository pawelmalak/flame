const ErrorResponse = require('../utils/ErrorResponse');
const Logger = require('../utils/Logger');
const logger = new Logger();

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // if (error.errors[0].type === 'unique violation') {
  //   const msg = error.errors[0].message;
  //   error = new ErrorResponse(`Field ${msg}`, 400);
  // }

  logger.log(error.message.split(',')[0], 'ERROR');

  if (process.env.NODE_ENV == 'development') {
    console.log(err);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
