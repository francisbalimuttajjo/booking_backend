const db = require("../models");
const crypto = require("crypto");
const { sendResponse, createToken, filterObj } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");
const Email = require("../utils/email");

exports.updateMe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return sendResponse(req, res, 400, "please provide an email", "fail");
    }
    const fields = filterObj(
      req.body,
      "firstName",
      "lastName",
      "photo",
      "role"
    );
    await db.User.update(fields, { where: { email } });
    const user = await db.User.findOne({ where: { email } });
    console.log(user);

    sendResponse(req, res, 200, "operation successfull");
  } catch (err0r) {
    return errorHandler(req, res, error, "User");
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

      return sendResponse(req, res, 200, `activation link sent to ${email}`);
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
