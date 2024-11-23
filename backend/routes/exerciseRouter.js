import express from "express";
import {
  deleteExercise,
  getAllExercise,
  getDailyExercise,
  getExercise,
  postDailyExercise,
  postExercise,
  updateDailyExercise,
  updateExercise,
} from "../controllers/exerciseController.js";
import {
  authenticate,
  checkAdminPermission,
} from "../controllers/authController.js";

export const exerciseRouter = express.Router();

exerciseRouter.route("/").get(getAllExercise).post(postExercise);
exerciseRouter
  .route("/daily")
  .all(authenticate)
  .get(getDailyExercise)
  .post(postDailyExercise)
  .put(updateDailyExercise)
  .delete();

exerciseRouter.route("/search").get(getAllExercise);

exerciseRouter
  .route("/:id")
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise);
