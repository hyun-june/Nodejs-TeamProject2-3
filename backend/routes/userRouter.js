import express from "express";
import { createUser, loginWithEmail } from "../controllers/userController.js";
export const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/login").post(loginWithEmail);

// userRouter.route("/").get();
// userRouter.route("/:id").get().put();
// userRouter.route("/detail").get().post().put();
