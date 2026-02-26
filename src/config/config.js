const dotenv = require('dotenv');
const path = require('path');
const joi = require('joi');

const DEFAULT_WALLET_MONEY = 500;
const DEFAULT_PAYMENT_OPTIONS = "PAYMENT_OPTION_DEFAULT";
const DEFAULT_ADDRESS = "ADDRESS_NOT_SET";

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Joi = require('joi');

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string()
        .valid('production', 'development', 'test')
        .required(),
    PORT: Joi.number()
        .default(3000),
    MONGODB_URL: Joi.string()
        .required()
        .description('MongoDB connection URL'),
    JWT_SECRET: Joi.string()
        .required()
        .description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
        .default(30)
        .description("minutes after which access tokens expire"),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    default_wallet_money: DEFAULT_WALLET_MONEY,
    default_payment_options: DEFAULT_PAYMENT_OPTIONS,
    default_address: DEFAULT_ADDRESS,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    },
};