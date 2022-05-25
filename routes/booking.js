const express = require("express");
const bookingController = require("../controllers/booking");
const router = express.Router();

router.route("/hotels/:hotelId/booking").post(bookingController.createBooking);
module.exports = router;
