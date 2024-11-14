import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  hashtags: [{ type: String, trim: true }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Comment",
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

feedSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

export const Feed = mongoose.model("Model", feedSchema);
