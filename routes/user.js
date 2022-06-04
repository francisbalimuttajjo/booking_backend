const express = require("express");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const router = express.Router();

router.route("/users/register").post(userController.createUser);
router.route("/users/auth").post(authController.auth);
router.route("/users/login").post(authController.loginUser);
router.route("/users/forgotPassword").post(userController.forgotPassword);
router.route("/users/passwordReset/:token").post(authController.resetPassword);
router
  .route("/users/activate-account/:token")
  .get(userController.activateAccount);

router.use(authController.isAuthenticated);
//
router
  .route("/users")
  .post(authController.restrictTo("admin"), userController.getUser);
router.route("/users/updateMe").post(userController.updateMe);
router.route("/users/updatePassword").post(authController.updatePassword);

module.exports = router;
