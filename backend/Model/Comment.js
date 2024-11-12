import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owen: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  feed: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Feed" },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const Comment = mongoose.model("Comment", commentSchema);
