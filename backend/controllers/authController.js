import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Model/User.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    console.log("user", user);
    if (user) {
      const isMatch = await bcrypt.compare(
        password.trim(),
        user.password.trim()
      );
      console.log(isMatch);
      console.log("password", password);
      console.log("user", user.password);
      if (isMatch) {
        const token = await user.generateToken();
        console.log("token", token);
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("email or password");
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("토큰이 존재하지 않습니다.");
    }
    const token = tokenString.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    req.userId = payload._id;
    next();
  } catch (error) {
    console.log("인증 오류", error); // 오류 로그 확인

    return res.status(400).json({
      status: "fail",
      message: error.message || "토큰이 유효하지 않습니다",
    });
  }
};

export const checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user.level !== "admin") throw new Error("권한이 없습니다.");
    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
