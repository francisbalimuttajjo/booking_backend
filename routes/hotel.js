const express = require("express");
const hotelController = require("../controllers/hotel");
const router = express.Router();

router.route("/hotels").post(hotelController.createHotel);
module.exports = router;
