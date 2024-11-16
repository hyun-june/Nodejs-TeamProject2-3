import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    level: { type: String, default: "customer" },
    feed: { type: mongoose.Schema.Types.ObjectId, ref: "Feed" },
  },
  { timestamps: true }
);

//필요 없는 정보 제거
userSchema.method.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
};

//jwt 사용해서 유저 토큰 생성하는 미들웨어
userSchema.methods.generateToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("token", token);
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

export const User = mongoose.model("User", userSchema);
