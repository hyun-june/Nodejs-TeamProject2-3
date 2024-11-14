const express = require("express");
const userRouter = express.Router();

userRouter.route("/").get();
userRouter.route("/:id").get().put();

module.exports = userRouter;
