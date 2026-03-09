const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const routesV1 = require('./routes/v1');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport.config');
const { errorHandler } = require('./middlewares/error');

const app = express();

// Use Helmet to set secure HTTP headers
app.use(helmet());

// Parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());
app.options('*', cors());

// Enable gzip compression for all responses
app.use(compression());

// Initialize Passport for authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Test route to verify server is running
app.get('/test', (req, res) => {
    res.send({message: 'Welcome to QKart!'});
});

// Use API routes
app.use('/v1', routesV1);

// Handle errors
app.use(errorHandler);

module.exports = app;