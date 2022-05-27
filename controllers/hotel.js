const db = require("../models");
const { sendResponse, filterObj } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");
const { getSearchQuery } = require("../utils/query");

//adding new hotel
//getting all hotels
//editing hotel
//deleting hotel
//sorting hotels by high ratings 
//getting first five highly rated hotels

exports.getAllHotels = async (req, res) => {
  try {
    const { Query, limit, page } = getSearchQuery(req.query);

    const hotels = await db.Hotel.findAndCountAll({
      limit,
      offset: page * limit,
      where: Query,
    });

    sendResponse(req, res, 200, hotels);
  } catch (err) {
    return errorHandler(req, res, err, "Hotel");
  }
};

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
    let stats = await db.Review.findAndCountAll({
      where: { hotel_id: req.params.id },
      attributes: [
        [db.sequelize.fn("AVG", db.sequelize.col("rating")), "averageRating"],
      ],
    });

    const noOfRatings = stats.count;
    const averageRating =
      stats.count < 1 ? 0 : parseInt(stats.rows[0].dataValues.averageRating);

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
