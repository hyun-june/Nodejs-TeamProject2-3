import express from "express";
import {
  createUser,
  getUser,
  getUserDetail,
  postUserDetail,
  updateUser,
  updateUserDetail,
} from "../controllers/userController.js";
import { authenticate } from "../controllers/authController.js";
export const userRouter = express.Router();

userRouter.route("/").post(createUser);
//내 정보
userRouter.route("/me").all(authenticate).get(getUser).put(updateUser);
//유저 디테일 정보
userRouter
  .route("/detail")
  .all(authenticate)
  .get(getUserDetail)
  .post(postUserDetail)
  .put(updateUserDetail);
