import express from "express";
import {
  deleteFood,
  getAllFood,
  getFood,
  postFood,
  updateFood,
} from "../controllers/foodController.js";
import {
  deleteDailyFood,
  getDailyFood,
  getSearchFood,
  postDailyFood,
  updateDailyFood,
} from "../controllers/dailyFoodController.js";
import { authenticate } from "../controllers/authController.js";

export const foodRouter = express.Router();

foodRouter
  .route("/daily")
  .all(authenticate)
  .get(getDailyFood)
  .put(updateDailyFood)
  .delete(deleteDailyFood);

foodRouter
  .route("/")
  .get(getAllFood)
  .post(postFood);

foodRouter
  .route("/:id")
  .get(getFood)
  .put(updateFood)
  .delete(deleteFood);

foodRouter.get("/search/:mealtype", getSearchFood);
foodRouter.route("/add/:mealtype").post(authenticate, postDailyFood);