const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/userSignUp", authController.signup);
router.post('/userSignin', authController.signin);

module.exports = router;
