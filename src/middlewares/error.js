const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");

// Convert any thrown error to a consistent ApiError-like shape
// (Place this BEFORE errorHandler in app.js)
const errorConverter = (err, req, res, next) => {
  // If it's already an ApiError instance or has a proper statusCode, pass through
  if (err instanceof ApiError) {
    return next(err);
  }

  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || httpStatus[statusCode] || "Internal Server Error";

  // Create a minimal ApiError-like object while preserving stack for dev/test
  const apiErr = new ApiError(statusCode, message);
  apiErr.stack = err.stack;
  return next(apiErr);
};

// Send response on errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Ensure safe defaults
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || httpStatus[statusCode] || "Internal Server Error";

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};