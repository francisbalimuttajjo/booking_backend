const db = require("../models");
const {
  sendResponse,
  filterObj,
  getTopRated5Hotels,
} = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");
const { getSearchQuery } = require("../utils/query");

exports.getTop5RatedHotels = async (req, res) => {
  try {
    const hotels = await db.Hotel.findAll({
      include: [
        {
          model: db.Review,
          as: "reviews",
          required: true,
        },
      ],
    });
    const topRatedHotels = getTopRated5Hotels(hotels);

    return sendResponse(req, res, 200, topRatedHotels.slice(0, 5));
  } catch (err) {
    return errorHandler(req, res, err, "Hotel");
  }
};

exports.deleteHotel = async (req, res) => {
  let transaction;
  const id = req.params.id;

  transaction = await db.sequelize.transaction();
  try {
    const hotel = await db.Hotel.findOne({ where: { id } });
    if (!hotel) {
      return sendResponse(
        req,
        res,
        404,
        `hotel with id ${id} is not available`,
        "fail"
      );
    }
    await db.Review.destroy({ where: { hotel_id: id } }, { transaction });
    await db.Hotel.destroy({ where: { id } }, { transaction });

    return sendResponse(req, res, 200, "operation successfull");
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
    }
    return errorHandler(req, res, err, "Hotel");
  }
};

exports.updateHotel = async (req, res) => {
  const fields = filterObj(
    req.body,
    "name",
    "price",
    "priceDiscount",
    "description",
    "mainImage",
    "services",
    "contacts",
    "location",
    "physicalLocation"
  );

  try {
    const result = await db.Hotel.update(fields, {
      where: { id: req.params.id },
    });

    if (result[0] === 0) {
      return sendResponse(
        req,
        res,
        400,
        `updating hotel with id ${req.params.id} unsuccessful`,
        "fail"
      );
    }
    return sendResponse(req, res, 200, "update successfull");
  } catch (err) {
    return errorHandler(req, res, err, "Hotel");
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const { Query, limit, page } = getSearchQuery(req.query);

    const hotels = await db.Hotel.findAndCountAll({
      limit,
      offset: page * limit,
      where: Query,
      // order: [["price", "DESC"]],
      order: [["price", "ASC"]],
    });

    return sendResponse(req, res, 200, hotels);
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
      "location",
      "physicalLocation"
    );

    const hotel = await db.Hotel.create(fields);
    return sendResponse(req, res, 201, hotel);
  } catch (error) {
    return errorHandler(req, res, error, "Hotel");
  }
};

exports.getHotel = async (req, res) => {
  try {
    const hotel = await db.Hotel.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Review,
          as: "reviews",
          include: [{ model: db.User, as: "author" }],
        },
        { model: db.Booking, as: "bookings" },
      ],
    });
    if (!hotel) {
      return sendResponse(
        req,
        res,
        404,
        `hotel with id ${req.params.id} is not available`
      );
    }

    //adding avg ratings and number of ratings
    let stats = await db.Review.findAndCountAll({
      where: { hotel_id: req.params.id },
      attributes: [
        [db.sequelize.fn("AVG", db.sequelize.col("rating")), "averageRating"],
      ],
    });

    const noOfRatings = stats.count;
    const count =
      stats.count < 1 ? 5 : 1 * stats.rows[0].dataValues.averageRating;

    const averageRating = stats.count < 1 ? 5 : count.toFixed(1);

    return sendResponse(req, res, 200, {
      averageRating,
      noOfRatings,
      hotel,
    });
  } catch (error) {
  
    return errorHandler(req, res, error, "Hotel");
  }
};
