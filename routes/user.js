const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.route("/users/register").post(userController.createUser);
router.route("/users").post(userController.getUser);
module.exports = router;
