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

exports.getHotel = async (req, res) => {
  try {
    const hotel = await db.Hotel.findOne({
      where: { id: req.params.id },
      include: [
        { model: db.Review, as: "reviews" },
        { model: db.Booking, as: "bookings" },
      ],
    });
    //adding avg ratings and number of ratings
    let stats = await db.Review.findAll({
      where: { hotel_id: req.params.id },
      attributes: [
        [db.sequelize.fn("COUNT", db.sequelize.col("rating")), "ratingsNumber"],
        [db.sequelize.fn("AVG", db.sequelize.col("rating")), "averageRating"],
      ],
    });

    const averageRating = parseInt(stats[0].dataValues.averageRating);
    const noOfRatings = parseInt(stats[0].dataValues.ratingsNumber);

    sendResponse(req, res, 200, {
      averageRating,
      noOfRatings,
      hotel,
    });
  } catch (error) {
    console.log(error);
    return errorHandler(req, res, error, "Hotel");
  }
};
