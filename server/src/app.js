import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import keys from "./config/keys";
import router from "./routes";
import { requestLogger, errorHandler } from "./middleware";
import seedDatabase from "./seedDatabase";
import fileUpload from "express-fileupload";

const createError = require("http-errors");

mongoose.connect(keys.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
  // seedDatabase();
});

mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

const app = express();

// middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(requestLogger);
app.use(fileUpload());

// api router
app.use(keys.app.apiEndpoint, router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "NotFound"));
});

// add the following
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

// error handler
app.use(errorHandler);

module.exports = app;
