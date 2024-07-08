const express = require("express");
const router = express.Router();
const { signup, login } = require("../controller/authController");
// Define routes for signup and login
router.post("/signup", signup);
router.post("/signin", login);

module.exports = router;
