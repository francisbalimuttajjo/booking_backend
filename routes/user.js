const express = require("express");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const router = express.Router();

router.route("/users/register").post(userController.createUser);
router.route("/users").post(userController.getUser);
router.route("/users/login").post(authController.loginUser);
router.route("/users/forgotPassword").post(userController.forgotPassword);
router.route("/users/passwordReset/:token").post(userController.resetPassword);
router
  .route("/users/activate-account/:token")
  .get(userController.activateAccount);
module.exports = router;
