import express from "express";
import { authRouter } from "./authRouter.js";
import { userRouter } from "./userRouter.js";
import { foodRouter } from "./foodRouter.js";
import { exerciseRouter } from "./exerciseRouter.js";
import { feedRouter } from "./feedRouter.js";

export const apiRouter = express.Router();

apiRouter.use("/", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/food", foodRouter);
apiRouter.use("/exercise", exerciseRouter);
apiRouter.use("/feed", feedRouter);
