const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const { useTreblle } = require("treblle");
const cookieParser = require("cookie-parser");
const { sendResponse } = require("./utils/utils");
const hotelRouter = require("./routes/hotel");
const userRouter = require("./routes/user");
const reviewRouter = require("./routes/review");
const bookingRouter = require("./routes/booking");



const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());



app.use(express.json({ limit: "10kb" }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

useTreblle(app, {
  apiKey: "GvXnXxtKU4nQhSiRPaMK6ZPgO3QaNxiy",
  projectId: "_YOUR_PROJECT_ID_",
});

// 1) GLOBAL MIDDLEWARES
// Serving static files
// app.use(express.static(path.join(__dirname, "public")));







app.get("/", (req, res) => {
  res.render("passwordReset.pug", { firstName: "bafra" });
});

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
