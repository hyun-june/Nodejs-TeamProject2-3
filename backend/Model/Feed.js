import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
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
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        userInfo: {
          nickname: { type: String },
          profileImg: { type: String },
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" },
  },
  { timestamps: true }
);

//해시 태그를 그냥 입력해도 앞에 # 붙도록 하는 기능
feedSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

export const Feed = mongoose.model("Feed", feedSchema);
