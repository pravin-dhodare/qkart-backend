const config = require('../config/config');
const tokenTypes = require('../token-types').tokenTypes;
const User = require('../models');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

// JWT Options for Passport JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
}

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            return done(new Error('Invalid token type'), false);
        }
        const user = await User.findById(payload.sub);
        if ( !user) {
            return done(new Error('User not found'), false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}

const JwtStrategy = new JWTStrategy(jwtOptions, jwtVerify);

module.exports = {
    JwtStrategy,
}