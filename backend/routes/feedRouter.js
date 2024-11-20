import express from "express";
import {
  deleteFeed,
  getAllFeed,
  getFeed,
  postFeed,
  updateFeed,
} from "../controllers/feedController.js";
import { authenticate } from "../controllers/authController.js";

export const feedRouter = express.Router();

feedRouter.route("/").get(getAllFeed).post(postFeed);
feedRouter
  .route("/:feedId")
  .get(authenticate, getFeed)
  .put(updateFeed)
  .delete(deleteFeed);
