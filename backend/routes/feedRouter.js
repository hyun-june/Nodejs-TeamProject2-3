import express from "express";
import {
  deleteFeed,
  getAllFeed,
  getFeed,
  postFeed,
  updateComments,
  updateFeed,
  getAllFeed2,
  registerView,
} from "../controllers/feedController.js";
import { authenticate } from "../controllers/authController.js";
import { uploadFeedFile } from "../utils/uploadFile.js";

export const feedRouter = express.Router();

feedRouter.route("/all").get(authenticate, getAllFeed2);

feedRouter
  .route("/")
  .get(getAllFeed)
  .post(authenticate, uploadFeedFile.single("file"), postFeed);
feedRouter
  .route("/:feedId")
  .get(authenticate, getFeed)
  .put(updateFeed)
  .delete(deleteFeed);

// feedRouter.put("/:feedId", updateComments);
feedRouter.post("/:feedId", authenticate, updateComments);
feedRouter.put("/:feedId/view", registerView);
