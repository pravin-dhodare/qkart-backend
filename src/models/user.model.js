const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value) => validator.isEmail(value),
                message: 'Invalid email format',
            }
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value),
                message: 'Password must be at least 8 characters long with at least one letter and one number',
            }
        },
        walletMoney: {
            type: Number,
            default: config.default_wallet_money,
        },
        address: {
            type: String,
            default: config.default_address,
        },
    },
    {
        timestamps: true,
    },
    {
        // toJSON transformation to hide password field when converting to JSON
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    }
);

// Create a unique index on the email field to enforce uniqueness at the database level
userSchema.index({ email: 1 }, { unique: true });

/**
 * Check if Email is already taken
 * @param {string} email - The email to check
 * @return {Promise<boolean>} - Returns true if email is taken, false otherwise
 * Static - Operate on the entire Model (collection)
 */
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

/**
 * Check if entered password matches the user's password
 * @param {string} password - The password to check
 * @return {Promise<boolean>} - Returns true if passwords match, false otherwise
 * Method - Operate on an instance of the Model (document)
*/
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model('User', userSchema)

module.exports = { User };
