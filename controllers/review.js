const db = require("../models");
const { sendResponse } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");

exports.createReview = async (req, res) => {
  try {
    if (!req.body.hotel_id) req.body.hotel_id = req.params.hotelId;
    const { review, user, rating, hotel_id } = req.body;

    //ensuring that u review an hotel u actually booked and
    const booked_hotel = await db.Booking.findAll({
      where: { user, hotel_id },
    });
    if (!booked_hotel.length) {
      return sendResponse(
        req,
        res,
        403,
        "You can only review an hotel you booked"
      );
    }

    //avoiding duplicate Reviews
    const available_review = await db.Review.findAll({
      where: { user, hotel_id },
    });
    if (available_review.length) {
      return sendResponse(req, res, 403, "You can only review an hotel once");
    }

    const new_review = await db.Review.create({
      review,
      user,
      rating,
      hotel_id,
    });

    sendResponse(req, res, 201, new_review);
  } catch (error) {
    return errorHandler(req, res, error, "Review");
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await db.Review.findAll({
      include: [
        { model: db.User, as: "author" },
        { model: db.Hotel, as: "hotel" },
      ],
    });
    sendResponse(req, res, 201, reviews);
  } catch (error) {
    console.log(error);
    return errorHandler(req, res, error, "Review");
  }
};
