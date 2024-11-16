import express from "express";
import { createUser, loginWithEmail } from "../controllers/userController.js";
export const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/login").post(loginWithEmail);
