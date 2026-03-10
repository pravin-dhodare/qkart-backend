const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { tokenTypes } = require('../config/token-types');


// Generate a JWT token
// Use seconds (numeric date) for `iat` and `exp` per JWT spec (not milliseconds)
const generateToken = (userId, expires, type, secrete = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(expires.getTime() / 1000),
        type,
    };

    return jwt.sign(payload, secrete);
};

// Generate auth tokens for a user
const generateAuthTokens = async (user) => {
    const minutes = config.jwt.accessExpirationMinutes || 1;
    const accessTokenExpires = new Date(Date.now() + minutes * 60 * 1000);
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    return {
        token: accessToken,
        expires: accessTokenExpires.toISOString(),
    };
};

module.exports = {
    generateToken,
    generateAuthTokens
}