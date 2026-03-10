const router = require("express").Router();
const { AuthController } = require("../../controllers");

// Register a new user - /auth/register
router.post('/register', AuthController.register);

// Login user - /auth/login
router.post('/login', AuthController.login);

module.exports = router;
