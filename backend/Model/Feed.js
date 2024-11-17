import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  hashtags: [{ type: String, trim: true }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

//해시 태그를 그냥 입력해도 앞에 # 붙도록 하는 기능
feedSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

export const Feed = mongoose.model("Model", feedSchema);
