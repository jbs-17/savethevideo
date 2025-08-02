// middlewares/responseWrapper.js

export function responseWrapper(req, res, next) {
  res.success = function (message = "Success", data = {}) {
    return res.json({
      status: true,
      message,
      data
    });
  };

  res.fail = function (message = "Failed", data = {}, error = Error('failed')) {
    return res.json({
      status: false,
      message,
      data,
      error
    });
  };

  next();
}
