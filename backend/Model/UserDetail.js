import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  purpose: { type: Number, required: true },
});

export const UserDetail = mongoose.model("UserDetail", userDetailSchema);
