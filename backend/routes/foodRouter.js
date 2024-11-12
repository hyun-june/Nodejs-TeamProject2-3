import express from "express";

export const foodRouter = express.Router();

foodRouter.route("/").get().post();
foodRouter.route("/foodId").get().post().put().delete();
