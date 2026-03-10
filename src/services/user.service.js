const { User } = require('../models/user.model');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const ApiError = require('../utils/api-errors');

/**
 * Get user by email
 * @param {String} email 
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

/**
 * Get user by ID
 * @param {String} id 
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
    return User.findById(id);
}

/**
 * Get all users
 * @returns {Promise<User[]>}
 */
const getAllUsers = async () => {
    return User.find();
}

/**
 * Create a new user
 * @param {Object} userBody 
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    const { email, password } = userBody;

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already in use');
    }

    // Hash the password before saving
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create and save the new user
    const newUser = new User({
        ...userBody,
        password: hashedPassword,
    });
    return newUser.save();
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    getAllUsers,
}