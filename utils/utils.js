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

const errorHandler = (req, res, error, model) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    return sendResponse(req, res, 403, `${model}  already exists`, "fail");
  } else if (error.name === "SequelizeValidationError") {
    const err = error.errors[0].message.split(".").join(" ");

    return sendResponse(req, res, 400, err, "fail");
  } else if (error.name === "otherError") {
    return sendResponse(req, res, 400, error.info.message, "fail");
  } else {
    return sendResponse(req, res, 500, "Something went wrong", "fail");
  }
};

module.exports = { sendResponse, errorHandler, createOtherError };
