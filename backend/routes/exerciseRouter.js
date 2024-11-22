import express from "express";
import {
  deleteExercise,
  getAllExercise,
  getExercise,
  postDailyExercise,
  postExercise,
  updateExercise,
} from "../controllers/exerciseController.js";
import {
  authenticate,
  checkAdminPermission,
} from "../controllers/authController.js";

export const exerciseRouter = express.Router();

exerciseRouter.route("/").get(getAllExercise).post(postExercise);
exerciseRouter.route("/daily").all(authenticate).post(postDailyExercise);

exerciseRouter
  .route("/:id")
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise);
