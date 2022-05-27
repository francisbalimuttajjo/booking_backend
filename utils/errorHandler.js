const { sendResponse } = require("./utils");

const errorHandler = (req, res, error, model) => {

   console.log(error);
  if (error.name === "SequelizeUniqueConstraintError") {
    return sendResponse(req, res, 403, `${model}  already exists`, "fail");
  } else if (error.name === "SequelizeValidationError") {
    const err = error.errors[0].message.split(".").join(" ");

    return sendResponse(req, res, 400, err, "fail");
  }
  //invalid id type
  else if (error.name === "SequelizeDatabaseError") {
   
    return sendResponse(req, res, 400, "invalid id provided", "fail");
  } else if (error.name === "otherError") {
    return sendResponse(req, res, 400, error.info.message, "fail");
  } else {
    return sendResponse(req, res, 500, "Something went wrong", "fail");
  }
};

module.exports = { errorHandler };
