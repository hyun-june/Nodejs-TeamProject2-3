import express from "express";
import {
  deleteFeed,
  getAllFeed,
  getFeed,
  postFeed,
  updateFeed,
} from "../controllers/feedController.js";
import { authenticate } from "../controllers/authController.js";
import { uploadFeedFile } from "../utils/uploadFile.js";

export const feedRouter = express.Router();

feedRouter
  .route("/")
  .get(getAllFeed)
  .post(authenticate, uploadFeedFile.single("file"), postFeed);
feedRouter
  .route("/:feedId")
  .get(authenticate, getFeed)
  .put(updateFeed)
  .delete(deleteFeed);
