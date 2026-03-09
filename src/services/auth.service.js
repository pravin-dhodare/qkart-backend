const userService = require('./user.service');
const apiError = require('../utils/api-error');
const httpStatus = require('http-status');


/**
 * Login with email and password
 * @param {String} email 
 * @param {String} password 
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        throw new apiError(httpStatus.BAD_REQUEST, 'Email and password are required');
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new apiError(httpStatus.UNAUTHORIZED, 'Invalid email or password (No user found)');
    }

    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) {
        throw new apiError(httpStatus.UNAUTHORIZED, 'Invalid email or password (Password mismatch)');
    }

    return user;
}

module.exports = {
    loginWithEmailAndPassword,
}