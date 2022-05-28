const express = require("express");
const hotelController = require("../controllers/hotel");
const authController = require("../controllers/auth");
const reviewRouter = require("./review");
const bookingRouter = require("./booking");
const router = express.Router();

router.use("/hotels/:hotelId/reviews", reviewRouter);
router.use("/hotels/:hotelId/booking", bookingRouter);

router.route("/hotels/top-rated").get(hotelController.getTop5RatedHotels);

router
  .route("/hotels")
  .post(
    authController.isAuthenticated,
    authController.restrictTo("admin"),
    hotelController.createHotel
  )
  .get(hotelController.getAllHotels);

router
  .route("/hotels/:id")
  .get(hotelController.getHotel)
  .patch(
    authController.isAuthenticated,
    authController.restrictTo("admin"),
    hotelController.updateHotel
  )
  .delete(
    authController.isAuthenticated,
    authController.restrictTo("admin"),
    hotelController.deleteHotel
  );

module.exports = router;
