import express from "express";

export const userRouter = express.Router();

userRouter.route("/").get();
userRouter.route("/:id").get().put();
userRouter.route("/detail").get().post().put();
