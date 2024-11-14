import express from "express";
import {
  getAllFeed,
  getFeed,
  postFeed,
  updateFeed,
} from "../controllers/feedController.js";

export const feedRouter = express.Router();

feedRouter.route("/").get(getAllFeed).post(postFeed);
feedRouter.route("/:feedId").get(getFeed).put(updateFeed).delete();
