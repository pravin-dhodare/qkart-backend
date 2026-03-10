const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/api-errors");

/**
 * Middleware to authenticate requests using JWT strategy.
 * It uses Passport.js to authenticate the user based on the JWT token provided in the request headers.
 * If authentication is successful, the user information is attached to the request object; otherwise, an unauthorized error is thrown.
 */

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    if (err || info || !user) {
        const detail = (err && err.message) || (info && info.message) || 'Please authenticate';
        return reject(new ApiError(httpStatus.UNAUTHORIZED, detail));
    }
    req.user = user;
    resolve();
};

const auth = () => (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
}

module.exports = auth;