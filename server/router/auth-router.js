const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controllers"); // inporting the controllers
const {signupSchema,loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(validate(loginSchema), authController.login,
);

module.exports = router;
