import express from "express";
import { authenticate } from "../controllers/authController.js";
import { getDailyWeight, updateDailyWeight } from "../controllers/dailyWeight.js";

export const dailyWeightRouter = express.Router();

dailyWeightRouter.get("/", authenticate, getDailyWeight);

dailyWeightRouter.put("/", authenticate, updateDailyWeight);
