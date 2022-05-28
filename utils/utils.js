const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const cookieOptions = {
  secure: process.env.NODE_ENV !== "development",
  httpOnly: true,
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
  ),
};

const createToken = (token) => {
  const Token = crypto.createHash("sha256").update(token).digest("hex");
  return Token;
};

const sendResponse = (req, res, statusCode, data, status) => {
  return res.status(statusCode).json({
    status: status ? "fail" : "success",
    data,
  });
};

const createOtherError = (message, name) => {
  let err = new Error(message);
  err.name = name ? name : "otherError";
  err.info = { message };
  return err;
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getTopRated5Hotels = (hotels) => {
  let result = [];
  hotels.map((el) => {
    const avg = el.reviews.map((el) => el.rating).reduce((a, b) => a + b, 0);

    result.push({ id: el.id, avgRating: avg / el.reviews.length });
  });
  const sorted_result = result.sort((a, b) => b.avgRating - a.avgRating);

  const idsArray = sorted_result.map((el) => el.id);
  return hotels.filter((el) => idsArray.includes(el.id));
};

module.exports = {
  sendResponse,
  createOtherError,
  filterObj,
  getTopRated5Hotels,
  createToken,
  signToken,
  cookieOptions,
};
