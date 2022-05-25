const db = require("../models");
const { sendResponse, errorHandler } = require("../utils/utils");

exports.createHotel = async (req, res) => {
  try {
    const hotel = await db.Hotel.create(req.body);
    sendResponse(req, res, 201, hotel);
  } catch (error) {
    return errorHandler(req, res, error, "Hotel");
  }
};
