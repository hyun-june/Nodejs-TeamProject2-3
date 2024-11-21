import express from "express";
import {
  deleteFood,
  getAllFood,
  getFood,
  postFood,
  updateFood,
} from "../controllers/foodController.js";
import {
  getDailyFood,
  getSearchFood,
  postDailyFood,
} from "../controllers/dailyFoodController.js";
import { authenticate } from "../controllers/authController.js";

export const foodRouter = express.Router();

// foodRouter.route("/").get(getAllFood).post(postFood);
foodRouter.route("/").get(authenticate, getDailyFood);
foodRouter.get("/search/:mealtype", getSearchFood);
foodRouter.route("/add/:mealtype").post(authenticate, postDailyFood);
// foodRouter.route("/:foodId").get(getFood).put(updateFood).delete(deleteFood);
