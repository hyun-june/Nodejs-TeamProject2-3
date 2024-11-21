import express from "express";
import {
  createUser,
  getOtherUser,
  getUser,
  getUserDetail,
  postUserDetail,
  updateUserDetail,
} from "../controllers/userController.js";
import { authenticate } from "../controllers/authController.js";
export const userRouter = express.Router();

userRouter.route("/").post(createUser);
//내 정보
userRouter.route("/me").all(authenticate).get(getUser);
//다른 사람 정보
userRouter.route("/other/:id").get(getOtherUser);

//유저 디테일 정보
userRouter
  .route("/detail")
  .all(authenticate)
  .get(getUserDetail)
  .post(postUserDetail)
  .put(updateUserDetail);
