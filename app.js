const express = require("express");
const hotelRouter = require("./routes/hotel");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", hotelRouter);

//not found route

// app.use("*", (req, res) =>
//   sendResponse(
//     req,
//     res,
//     404,
//     `${req.originalUrl} is not available on the server`,
//     "fail"
//   )
// );

module.exports = app;
