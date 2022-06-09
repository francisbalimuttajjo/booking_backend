const db = require("../models");
const crypto = require("crypto");
const {
  sendResponse,
  createToken,
  filterObj,
  getRandomNumber,
} = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");
const Email = require("../utils/email");

exports.updateMe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return sendResponse(req, res, 400, "please provide an email", "fail");
    }
    const fields = filterObj(req.body, "firstName", "lastName", "photo");
    await db.User.update(fields, { where: { email } });

    sendResponse(req, res, 200, "operation successfull");
  } catch (error) {
    return errorHandler(req, res, error, "User");
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email)
      return sendResponse(req, res, 400, "please provide an email", "fail");

    const new_password = getRandomNumber(1000000, 10000000).toString();

    const user = await db.User.findOne({
      where: { email: email.trim(), active: true },
    });

    if (!user) {
      return sendResponse(req, res, 400, "no user with that email", "fail");
    }
    const stored_password = user.password;

    await db.User.update(
      { password: new_password },
      { where: { email: email.trim(), active: true }, individualHooks: true }
    );

    try {
      ///sending the emails
      await new Email(user, new_password).sendPasswordReset();

      return sendResponse(
        req,
        res,
        200,
        `A new password has been  sent to ${email}`
      );
    } catch (err) {
      await db.User.update(
        { password: stored_password },
        { where: { email, active: true } }
      );
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
    return res.render("success.pug");
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
      email: email.trim(),
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
      return sendResponse(
        req,
        res,
        400,
        "error while sending email,try again",
        "fail"
      );
    }

    return sendResponse(
      req,
      res,
      201,
      `Account activation link sent to ${email}`
    );
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
    return sendResponse(req, res, 201, user);
  } catch (error) {
    return errorHandler(req, res, error, "User");
  }
};
