import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nickname: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  purpose: { type: Number, required: true },
  profileImg: { type: String, required: true, trim: true },
});

export const UserDetail = mongoose.model("UserDetail", userDetailSchema);
