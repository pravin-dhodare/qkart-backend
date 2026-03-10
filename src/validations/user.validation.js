const joi = require("joi");
const { objectId } = require("./custom.validation");

/**
 * Validation schemas for user routes
 * - getUserById: validates that the id parameter is a valid MongoDB ObjectId
 * - getUserByEmail: validates that the email parameter is a valid email format
 * - getUserByEmailOrId: validates that either id or email query parameter is provided and valid
 */

const getUserById = {
    params: joi.object().keys({
        id: joi.string().required().custom(objectId),
    }),
}

const getUserByEmail = {
    params: joi.object().keys({
        email: joi.string().required().email(),
    }),
}

const getUserByEmailOrId = {
    query: joi.object().keys({
        id: joi.string().custom(objectId),
        email: joi.string().email(),
    }).or('id', 'email'),
}

module.exports = {
    getUserById,
    getUserByEmail,
    getUserByEmailOrId,
};