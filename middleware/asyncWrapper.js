function asyncWrapper(foo) {
  return function (req, res, next) {
    return Promise.resolve(foo(req, res, next)).catch(next);
  };
}

module.exports = asyncWrapper;
