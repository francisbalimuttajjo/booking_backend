const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { errorHandler } = require("../utils/errorHandler");
const { sendResponse, signToken, createToken } = require("../utils/utils");

//authentication on app start up to keep users logged in
exports.auth = async (req, res) => {
  try {
    if (!req.headers.token) req.headers.token = req.body.token;
    const { token } = req.headers;

    //verifying token
    const decoded_token = await jwt.verify(token, process.env.JWT_SECRET);

    //checking if user still exists
    const user = await db.User.findOne({
      where: {
        id: decoded_token.id,
        active: true,
      },
    });

    if (user) {
      return sendResponse(req, res, 200, user);
    }

    sendResponse(req, res, 400, "no user with the id", "fail");
  } catch (err) {
    return sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendResponse(
        req,
        res,
        403,
        "You do not have permission to perform this action",
        "fail"
      );
    }

    next();
  };
};

//authentication middleware
exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.token ? req.headers.token : req.body.token;
    if (!token) {
      return sendResponse(req, res, 400, "No token was provided", "fail");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //checking if user still exists
    const user = await db.User.findOne({
      where: {
        id: decoded.id,
        active: true,
      },
    });

    if (!user) {
      sendResponse(req, res, 400, "no user with the id", "fail");
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    return sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword, email } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword || !email) {
      return sendResponse(
        req,
        res,
        400,
        "please provide passwords and email",
        "fail"
      );
    }
    if (newPassword !== confirmPassword) {
      return sendResponse(req, res, 400, " passwords must be the same", "fail");
    }
    const user = await db.User.findOne({
      where: { email: email.trim(), active: true },
    });

    //verifying password
    const verifyPassword = await bcrypt.compare(currentPassword, user.password);

    if (!verifyPassword)
      return sendResponse(req, res, 400, "incorrect password provided", "fail");
    await db.User.update(
      { password: newPassword },
      { where: { email }, individualHooks: true }
    );

    return sendResponse(req, res, 200, "password updated");
  } catch (err) {
    return errorHandler(req, res, err, "User");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, passwordConfirm } = req.body;
    if (!password || !passwordConfirm) {
      return sendResponse(req, res, 400, "please provide passwords", "fail");
    }
    if (password !== passwordConfirm) {
      return sendResponse(req, res, 400, " passwords must be the same", "fail");
    }
    const token = createToken(req.params.token);

    const user = await db.User.findOne({ where: { token, active: true } });

    if (!user)
      return sendResponse(
        req,
        res,
        400,
        "token doesnt exist or is expired",
        "fail"
      );
    await db.User.update(
      { token: "", password },
      { where: { token, active: true }, individualHooks: true }
    );

    return sendResponse(req, res, 200, "operation successful");
  } catch (err) {
    return errorHandler(req, res, err, "User");
  }
};

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
    console.log(token);
    sendResponse(req, res, 200, { user, token });
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};
