const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
// const MongoClient = require('mongodb').MongoClient;


require('dotenv').config()
// Connect to database
// MongoClient

// set Environment
let mongoUrl = "";
if (process.env.STAGE === "development") {
  mongoUrl = process.env.MONGO_URL_DEV;
} else if (process.env.STAGE === "production") {
  mongoUrl = process.env.MONGO_URL_PRODUCTION;
  
}

mongoose
  // .connect("mongodb://localhost:27017/news", { useNewUrlParser: true})
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

// Configure express
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Config CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Method", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, fingerprint"
  );
  next();
});

app.use("/api", require("./routes/api/post"));
app.use("/api/users", require("./routes/api/users"));

app.use("/", express.static("public"));
// app.use("/", express.static("public"));
// app.use("/", (req, res) => {
//   res.render("../news-client/public/index");
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
