const db = require("../models");
const { sendResponse } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");

exports.createBooking = async (req, res) => {
  try {
    if (!req.body.hotel_id) req.body.hotel_id = req.params.hotelId;
    const { user, hotel_id, checkin_date, nights, cash_paid } = req.body;

    const booking = await db.Booking.create({
      user,
      hotel_id,
      checkin_date,
      nights,
      cash_paid,
    });
    sendResponse(req, res, 201, booking);
  } catch (error) {
  
    return errorHandler(req, res, error, "Booking");
  }
};
