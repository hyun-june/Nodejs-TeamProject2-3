import { User } from "../Model/User.js";
import { UserDetail } from "../Model/UserDetail.js";
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
    console.log("Encrypted password:", password);
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
    throw new Error("Invalid email or password");
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
