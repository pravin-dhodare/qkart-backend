const { UserService } = require('../services');
const catchAsync = require('../utils/catch-async');
const ApiError = require('../utils/api-errors');
const httpStatus = require('http-status');

/**
 * Get all users
 * @method GET /users/all
 */
const getAllUsers = catchAsync(async (req, res) => {
    const users = await UserService.getAllUsers();
    res.status(httpStatus.OK).json(users);
});

/**
 * Get user by email
 * @method GET /users/email/:email
 */
const getUserByEmail = catchAsync(async (req, res) => {
    const { email } = req.params;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.status(httpStatus.OK).json(user);
});

/**
 * Get user by ID
 * @method GET /users/id/:id
 */
const getUserById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.status(httpStatus.OK).json(user);
});

const getUserByEmailOrId = catchAsync(async (req, res) => {
    const { email, id } = req.query;
    let user;

    if (email) {
        user = await UserService.getUserByEmail(email);
    } else if (id) {
        user = await UserService.getUserById(id);
    }

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    res.status(httpStatus.OK).json(user);
});

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    getUserByEmailOrId,
}