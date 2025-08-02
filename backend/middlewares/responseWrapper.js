// middlewares/responseWrapper.js

export function responseWrapper(req, res, next) {
  res.ok = function (message = "Success", data = null) {
    return res.json({
      status: true,
      message,
      data
    });
  };

  res.fail = function (message = "Failed", error = null) {
    return res.json({
      status: false,
      message,
      data: null,
      error
    });
  };

  next();
}
