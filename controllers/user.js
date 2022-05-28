const db = require("../models");
const crypto = require("crypto");
const { sendResponse, createToken } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");
const Email = require("../utils/email");

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
      { token: undefined, password },
      { where: { token, active: true }, individualHooks: true }
    );

    sendResponse(req, res, 200, "operation successful");
  } catch (err) {
    return errorHandler(req, res, err, "User");
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email)
      return sendResponse(req, res, 400, "please provide an email", "fail");

    const activationToken = crypto.randomBytes(32).toString("hex");
    const token = createToken(activationToken);

    const user = await db.User.findOne({ where: { email, active: true } });
    if (!user) {
      return sendResponse(req, res, 400, "no user with that email", "fail");
    }

    await db.User.update({ token }, { where: { email, active: true } });

    try {
      const url = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/passwordReset/${activationToken}`;

      ///sending the emails
      await new Email(user, url).sendPasswordReset();

      return sendResponse(
        req,
        res,
        200,
        `activation link sent to ${req.body.email}`
      );
    } catch (err) {
      await db.User.update({ token: "" }, { where: { email, active: true } });
      return sendResponse(req, res, 500, "error while sending email", "fail");
    }
  } catch (err) {
    return errorHandler(req, res, err, "User");
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const token = createToken(req.params.token);
    const user = await db.User.findOne({ where: { token } });

    if (!user) return sendResponse(req, res, 401, "invalid token", "fail");
    await db.User.update(
      { active: true, token: "" },
      {
        where: { token },
      }
    );

    return sendResponse(req, res, 200, "account activated,login to continue");
  } catch (err) {
    return errorHandler(req, res, error, "User");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    const activationToken = crypto.randomBytes(32).toString("hex");

    const token = createToken(activationToken);

    const newUser = await db.User.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      token,
    });

    try {
      const url = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/activate-account/${activationToken}`;

      await new Email(newUser, url).sendWelcome();
    } catch (e) {
      await db.User.destroy({ where: { email } });
      sendResponse(
        req,
        res,
        400,
        "error while sending email,try again",
        "fail"
      );
    }

    sendResponse(req, res, 201, `account activation link sent to ${email}`);
  } catch (error) {
    return errorHandler(req, res, error, "User");
  }
};

exports.getUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.User.findOne({
      where: { email },
      include: [
        { model: db.Review, as: "reviews" },
        { model: db.Booking, as: "bookings" },
      ],
    });
    sendResponse(req, res, 201, user);
  } catch (error) {
    return errorHandler(req, res, error, "User");
  }
};
