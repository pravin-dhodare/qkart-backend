const router = require("express").Router();
const { UserController } = require("../../controllers");
const { userValidation } = require("../../validations");
const validate = require("../../middlewares/validate");

// Fetch all users - /users/all
router.get('/all', validate(userValidation.getAllUsers), UserController.getAllUsers);

// Fetch user by email - /users/email/:email
router.get('/email/:email', validate(userValidation.getUserByEmail), UserController.getUserByEmail);

// Fetch user by ID - /users/id/:id
router.get('/id/:id', validate(userValidation.getUserById), UserController.getUserById);

// Test - Fetch user by email or id - /users & Query Param as {id: 1} or /users & Query Param as {email: "abc@d.com}
router.get('/', UserController.getUserByEmailOrId);

module.exports = router;
