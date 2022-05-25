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

module.exports = { sendResponse, createOtherError, filterObj };
