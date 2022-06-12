const express = require("express");
const bookingController = require("../controllers/booking");
const authController = require("../controllers/auth");
const router = express.Router();

router.use(authController.isAuthenticated);

router.route("/booking").post(bookingController.getMyBookings);

router
  .route("/booking/:id")
  .delete(bookingController.cancelBooking)
  .patch(bookingController.editBooking);
router.route("/hotels/:hotelId/booking").post(bookingController.createBooking);
module.exports = router;
