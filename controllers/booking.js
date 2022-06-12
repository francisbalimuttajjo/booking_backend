const db = require("../models");
const { sendResponse, filterObj } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");

exports.getMyBookings = async (req, res) => {
  try {
    if (!req.body.user) req.body.user = req.user.email;

    const bookings = await db.Booking.findAndCountAll({
      where: { user: req.body.user },
    });
    return sendResponse(req, res, 200, bookings);
  } catch (error) {
    return errorHandler(req, res, error, "Booking");
  }
};

exports.editBooking = async (req, res) => {
  const fields = filterObj(req.body, "checkin_date", "nights", "cash_paid");

  try {
    const result = await db.Booking.update(fields, {
      where: { id: req.params.id },
    });

    if (result[0] === 0) {
      return sendResponse(
        req,
        res,
        400,
        `updating booking with id ${req.params.id} unsuccessful`,
        "fail"
      );
    }
    return sendResponse(req, res, 200, "update successfull");
  } catch (err) {
    return errorHandler(req, res, err, "Booking");
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const result = await db.Booking.destroy({ where: { id: req.params.id } });

    if (result < 1) {
      return sendResponse(req, res, 404, "no data for provided id", "fail");
    }
    return sendResponse(req, res, 200, "operation successfull");
  } catch (err) {
    return errorHandler(req, res, err, "Booking");
  }
};

exports.createBooking = async (req, res) => {
  try {
    if (!req.body.hotel_id) req.body.hotel_id = req.params.hotelId;
    if (!req.body.user) req.body.user = req.user.email;
    const { hotel_id, checkin_date, nights, cash_paid, user } = req.body;

    const booking = await db.Booking.create({
      user,
      hotel_id,
      checkin_date,
      nights,
      cash_paid,
    });
    return sendResponse(req, res, 201, booking);
  } catch (error) {
    return errorHandler(req, res, error, "Booking");
  }
};
