import express from "express";

export const exerciseRouter = express.Router();

exerciseRouter.route("/").get().post();
exerciseRouter.route(":id").get().put().delete();
