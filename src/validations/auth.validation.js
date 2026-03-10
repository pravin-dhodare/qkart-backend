const joi = require("joi");
const { password } = require("./custom.validation");
const e = require("express");

/**
 * Validation schemas for authentication routes
 * - email: required, must be a valid email format
 * - password: required, must be at least 8 characters and contain at least 1 letter and 1 number
 * - name: required, must be a string
 */
const register = {
    body: joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required().custom(password),
        name: joi.string().required(),
    }),
};

/**
 * Validation schema for login route
 * - email: required, must be a valid email format
 * - password: required, must be a string
 */
const login = {
    body: joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required(),
    }),
}

module.exports = {
    register,
    login,
};