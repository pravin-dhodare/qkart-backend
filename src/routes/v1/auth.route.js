const router = require("express").Router();
const { AuthController } = require("../../controllers");
const { authValidation } = require("../../validations");
const validate = require("../../middlewares/validate");

// Register a new user - /auth/register
router.post('/register', validate(authValidation.register), AuthController.register);

// Login user - /auth/login
router.post('/login', validate(authValidation.login), AuthController.login);

module.exports = router;
