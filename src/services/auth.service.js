const { getUserByEmail } = require('./user.service');
const ApiError = require('../utils/api-errors');
const httpStatus = require('http-status');


/**
 * Login with email and password
 * @param {String} email 
 * @param {String} password 
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
    }

    const user = await getUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password (No user found)');
    }

    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password (Password mismatch)');
    }

    return user;
}

module.exports = {
    loginWithEmailAndPassword,
}