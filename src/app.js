const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const config = require("./config/config");
const routes = require("./routes");
const ApiError = require("./utils/ApiError");
const path = require("path");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
const corsConfig = {
  origin: config.corsOrigin,
  credentials: true,
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// v1 api routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
