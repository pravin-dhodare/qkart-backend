const { userService } = require('./user.service');
const catchAsync = require('../utils/catch-async');
const apiError = require('../utils/api-error');
const httpStatus = require('http-status');

/**
 * Get all users
 * @method GET /users/all
 */
const getAllUsers = catchAsync(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(httpStatus.OK).json(users);
});

/**
 * Get user by email
 * @method GET /users/email/:email
 */
const getUserByEmail = catchAsync(async (req, res) => {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new apiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.status(httpStatus.OK).json(user);
});

/**
 * Get user by ID
 * @method GET /users/id/:id
 */
const getUserById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
        throw new apiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.status(httpStatus.OK).json(user);
});

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
}