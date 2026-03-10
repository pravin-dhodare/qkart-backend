const { UserService, AuthService, TokenService } = require('../services');
const catchAsync = require('../utils/catch-async');
const httpStatus = require('http-status');

/**
 * Login user with email and password
 * @method POST /auth/login
 * @body {String} email
 * @body {String} password
 * @returns {Object} user and token
 */
const login = catchAsync(async (req, res) => {
    console.log("Login: ", req.body);
    const { email, password } = req.body;
    const user = await AuthService.loginWithEmailAndPassword(email, password);
    const access = await TokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).json({ message: 'Login successful', user, access });
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
    console.log("Register: ", req.body);
    const { name, email, password } = req.body;
    const newUserBody = { name, email, password };
    const newUser = await UserService.createUser(newUserBody);
    const access = await TokenService.generateAuthTokens(newUser);
    res.status(httpStatus.OK).json({ message: 'Registration successful', user: newUser, access });
});

module.exports = {
    login,
    register,
}