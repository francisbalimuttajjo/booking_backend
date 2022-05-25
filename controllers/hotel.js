const db = require("../models");
const { sendResponse, filterObj } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");

exports.createHotel = async (req, res) => {
  try {
    const fields = filterObj(
      req.body,
      "name",
      "price",
      "priceDiscount",
      "description",
      "mainImage",
      "services",
      "contacts",
      "location"
    );

    const hotel = await db.Hotel.create(fields);
    sendResponse(req, res, 201, hotel);
  } catch (error) {
    return errorHandler(req, res, error, "Hotel");
  }
};
