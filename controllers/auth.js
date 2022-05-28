const bcrypt = require("bcrypt");
const { sendResponse, signToken } = require("../utils/utils");
const db = require("../models");


exports.loginUser = async (req, res) => {
  try {
    //checking if not empty req body
    const { email, password } = req.body;

    if (!email || !password)
      return sendResponse(
        req,
        res,
        400,
        "Please provide email and password",
        "fail"
      );
    //confirming users existance && that the user is active ie didnt delete or hasnt activated his acc
    const user = await db.User.findOne({
      where: { email: email.trim(), active: true },
    });

    //if not user reject request to login
    if (!user)
      return sendResponse(
        req,
        res,
        400,
        "invalid credentials provided",
        "fail"
      );
    //verifying password
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword)
      return sendResponse(
        req,
        res,
        400,
        "invalid credentials provided",
        "fail"
      );
    //sign token and send it with user
    const token = await signToken(user.id);

    sendResponse(req, res, 200, { user, token });
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};
