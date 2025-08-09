// middlewares/responseWrapper.js

export function responseWrapper(req, res, next) {
  res.success = function (message = "Success", data = {}, error) {
    return res.json({
      status: true,
      message,
      data,
      error
    });
  };

  res.fail = function (message = "Failed", data = null, error = new Error('failed')) {
    return res.json({
      status: false,
      message,
      data,
      error
    });
  };

  next();
}
