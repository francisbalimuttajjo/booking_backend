const db = require("../models");
const { sendResponse, filterObj } = require("../utils/utils");
const { errorHandler } = require("../utils/errorHandler");

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
    const { hotel_id, checkin_date, nights, cash_paid } = req.body;

    const booking = await db.Booking.create({
      user: req.user.email,
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
