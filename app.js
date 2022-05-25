const cors = require("cors");
const express = require("express");
const { sendResponse } = require("./utils/utils");
const hotelRouter = require("./routes/hotel");
const userRouter = require("./routes/user");
const reviewRouter = require("./routes/review");
const bookingRouter = require("./routes/booking");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", hotelRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", bookingRouter);

//not found route

app.use("*", (req, res) =>
  sendResponse(
    req,
    res,
    404,
    `${req.originalUrl} is not available on the server`,
    "fail"
  )
);

module.exports = app;
