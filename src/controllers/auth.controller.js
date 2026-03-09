const { UserService, AuthService, TokenService } = require('../services');
const catchAsync = require('../utils/catch-async');
const apiError = require('../utils/api-error');
const httpStatus = require('http-status');

/**
 * Login user with email and password
 * @method POST /auth/login
 * @body {String} email
 * @body {String} password
 * @returns {Object} user and token
 */
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthService.loginWithEmailAndPassword(email, password);
    const token = await TokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).json({ message: 'Login successful', user, token });
});

/**
 * Register a new user
 * @method POST /auth/register
 * @body {String} name
 * @body {String} email
 * @body {String} password
 * @returns {Object} user and token
 */
const register = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const newUserBody = { name, email, password };
    const newUser = await UserService.createUser(newUserBody);
    const token = await TokenService.generateAuthTokens(newUser);
    res.status(httpStatus.OK).json({ message: 'Registration successful', user: newUser, token });
});

module.exports = {
    login,
    register,
}