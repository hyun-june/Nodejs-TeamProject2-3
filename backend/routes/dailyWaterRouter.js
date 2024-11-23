import express from "express";
import { authenticate } from "../controllers/authController.js";
import {
  getWaterAmount,
  updateWaterAmount,
} from "../controllers/dailyWaterController.js";

export const dailyWaterRouter = express.Router();

dailyWaterRouter.get("/", authenticate, getWaterAmount);
dailyWaterRouter.patch("/", authenticate, updateWaterAmount);
