 const db = require("./models");
const app = require("./app");

require("dotenv").config({});

const PORT = process.env.PORT || 8000;

//connecting to postgress db using sequelize
app.listen(PORT, async () => {
  db.sequelize
    .authenticate()
    .then(() => console.log("authenticated"))
    .catch(() => {
      console.log("didnt authenticate,something went wrong");
    });
});
