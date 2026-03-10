const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { tokenTypes } = require('../config/token-types');


// Generate a JWT token
const generateToken = (userId, expires, type, secrete = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: Date.now(),
        exp: expires.getTime(),
        type,
    }

    return jwt.sign(payload, secrete);
}

// Generate auth tokens for a user
const generateAuthTokens = async (user) => {
    let minutes = config.jwt.expiresInMinutes || 240;
    const accessTokenExpires = new Date(Date.now() + minutes * 60 * 1000);
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    return {
            token: accessToken,
            expires: accessTokenExpires.toISOString(),
        };
}

module.exports = {
    generateToken,
    generateAuthTokens
}