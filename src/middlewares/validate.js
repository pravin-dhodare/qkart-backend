const joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../utils/api-errors");
const pick = require("lodash/pick");

/**
 * Middleware to validate request data against a Joi schema
 * - Checks if request body is JSON if present
 * - Validates request params, query, and body against the provided schema
 * - If validation fails, throws a 400 Bad Request error with details
 * - If validation succeeds, updates the request object with the validated values and calls next()
 */

const validate = (schema) => (req, res, next) => {
  // Request body should be JSON, if present
  if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
    return next(
      new ApiError(
        httpStatus.UNSUPPORTED_MEDIA_TYPE,
        "Supports JSON request body only"
      )
    );
  }

  // cherry-pick from the input schema ["params", "query", "body"] fields
  const validSchema = pick(schema, ["params", "query", "body"]);

  // cherry-pick from the request object ["params", "query", "body"] fields
  const object = pick(req, Object.keys(validSchema));

  // Compile schema to Joi schema object and validate the request object
  const { value, error } = joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  // If validation fails throw 400 Bad Request error
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // Update validated fields in request with returned value
  Object.assign(req, value);

  return next();
};

module.exports = validate;