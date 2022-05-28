const express = require("express");
const bookingController = require("../controllers/booking");
const authController = require("../controllers/auth");
const router = express.Router();

router;

router
  .route("/booking/:id")
  .delete(authController.isAuthenticated, bookingController.cancelBooking)
  .patch(authController.isAuthenticated, bookingController.editBooking)
router
  .route("/hotels/:hotelId/booking")
  .post(authController.isAuthenticated, bookingController.createBooking);
module.exports = router;
