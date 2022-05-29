const express = require("express");
const reviewController = require("../controllers/review");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/hotels/:hotelId/reviews")
  .post(
    authController.isAuthenticated,
    reviewController.createReview);
module.exports = router;
