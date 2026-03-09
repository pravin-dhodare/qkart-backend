const express = require("express")
const router = express.Router();
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");

// Use the user routes for any requests to /users
router.use("/users", userRoutes);

router.use("/auth", authRoutes);

module.exports = router;
