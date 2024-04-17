import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./src/routes/index.js";
import { responseMiddleware } from "./src/utils/functions.js";
import logger from "./src/utils/logger.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// connection to mongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    logger.info("Database connections successfully");
  })
  .catch((error) => {
    logger.info(error);
  });

// enables cross origin request
app.use(cors());

// compress responses
app.use(compression());

// Use body parser to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Used morgan for logging
app.use(morgan("dev"));

// response middleware
app.use(responseMiddleware);

// Routes
app.use(routes);

// handle 404 error
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found :(",
    status: 404,
  });
});

app.listen(PORT || 5000, () => {
  logger.info(`Server started on ${PORT || 5000}`);
});
