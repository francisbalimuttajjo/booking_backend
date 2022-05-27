const express = require("express");
const hotelController = require("../controllers/hotel");
const reviewRouter = require("./review");
const bookingRouter = require("./booking");
const router = express.Router();

router.use("/hotels/:hotelId/reviews", reviewRouter);
router.use("/hotels/:hotelId/booking", bookingRouter);

router.route("/hotels/top-rated").get(hotelController.getTopRatedHotels);

router
  .route("/hotels")
  .post(hotelController.createHotel)
  .get(hotelController.getAllHotels);
router
  .route("/hotels/:id")
  .get(hotelController.getHotel)
  .patch(hotelController.updateHotel)
  .delete(hotelController.deleteHotel);
module.exports = router;
