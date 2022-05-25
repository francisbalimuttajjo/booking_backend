const db = require("../models");
const { sendResponse } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm, photo } =
      req.body;
    const user = await db.User.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      photo,
    });
    sendResponse(req, res, 201, user);
  } catch (error) {
    return errorHandler(req, res, error, "User");
  }
};
