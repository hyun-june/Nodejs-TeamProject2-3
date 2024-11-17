import express from "express";
import {
  deleteExercise,
  getAllExercise,
  getExercise,
  postExercise,
  updateExercise,
} from "../controllers/exerciseController.js";

export const exerciseRouter = express.Router();

exerciseRouter.route("/").get(getAllExercise).post(postExercise);
exerciseRouter
  .route("/:id")
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise);
