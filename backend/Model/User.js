import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number },
    level: { type: String, default: "customer" },
  },
  { timestamps: true }
);

userSchema.method.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
};

userSchema.methods.generateToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

export const User = mongoose.model("User", userSchema);
