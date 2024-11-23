import express from "express";
import {
  deleteFeed,
  getAllFeed,
  getFeed,
  getSearchFeed,
  postFeed,
  updateComments,
  updateFeed,
} from "../controllers/feedController.js";
import { authenticate } from "../controllers/authController.js";
import { uploadFeedFile } from "../utils/uploadFile.js";

export const feedRouter = express.Router();

feedRouter
  .route("/")

  .post(authenticate, uploadFeedFile.single("file"), postFeed);
feedRouter
  .route("/:feedId")
  .get(authenticate, getFeed)
  .put(updateFeed)
  .delete(deleteFeed);

// feedRouter.put("/:feedId", updateComments);
feedRouter.post("/:feedId", authenticate, updateComments);
feedRouter.route("/").get((req, res) => {
  const query = req.query.q;

  if (query) {
    getSearchFeed(req, res);
  } else {
    getAllFeed(req, res);
  }
});
