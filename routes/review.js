const express = require("express");
const reviewController = require("../controllers/review");
const router = express.Router();

router.route("/hotels/:hotelId/reviews").post(reviewController.createReview);
module.exports = router;
