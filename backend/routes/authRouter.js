import express from "express";
import { loginWithEmail } from "../controllers/authController.js";
import { createUser } from "../controllers/userController.js";

export const authRouter = express.Router();

authRouter.post("/login", loginWithEmail);
authRouter.post("/signup", createUser);
