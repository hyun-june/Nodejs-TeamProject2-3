import { User } from "../Model/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    let { email, name, password, phone, level } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입된 유저입니다!");
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      name,
      password,
      phone,
      level: level ? level : "customer",
    });
    await newUser.save();
    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(
        password.trim(),
        user.password.trim()
      );
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
