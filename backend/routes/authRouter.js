import express from "express";

export const authRouter = express.Router();

authRouter.get("/");
authRouter.post("/login");
authRouter.post("/signup");
