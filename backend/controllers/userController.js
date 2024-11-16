import { User } from "../Model/User.js";
import { UserDetail } from "../Model/UserDetail.js";
import bcrypt from "bcryptjs";

//유저 생성
export const createUser = async (req, res) => {
  try {
    let { email, name, password, level } = req.body;
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
      level: level ? level : "customer",
    });
    await newUser.save();
    return res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//내 정보 가져오기
export const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
    return res.status(200).json({ status: "success", user, token });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

//유저 디테일 페이지 저장하기
export const postUserDetail = async (req, res) => {
  try {
    const { userId } = req;
    const { age, height, weight, purpose } = req.body;

    const newUserDetail = await UserDetail.create({
      user: userId,
      age,
      height,
      weight,
      purpose,
    });

    res.status(201).json({ status: "success", data: newUserDetail });
  } catch {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

//유저 디테일 페이지 가져오기
export const getUserDetail = async (req, res) => {
  try {
    const { userId } = req;
    const userDetail = await UserDetail.findOne(userId);
    if (!userDetail) {
      throw new Error("해당 유저의 정보를 찾을 수 없습니다.");
    }
    res.status(200).json({ status: "success", data: userDetail });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};
//유저 디테일 페이지 수정
export const updateUserDetail = async (req, res) => {
  try {
    const { userId } = req;
    const { age, height, weight, purpose } = req.body;

    // 값이 비어있거나 누락된 경우 처리
    if (age == null || height == null || weight == null || purpose == null) {
      throw new Error("빈 칸을 채워주세요.");
    }

    const userDetail = await UserDetail.findOneAndUpdate(
      { user: userId },
      { age, height, weight, purpose },
      { new: true }
    );

    if (!userDetail) {
      throw new Error("유저의 상세 정보를 찾을 수 없습니다.");
    }

    res.status(200).json({ status: "success", data: userDetail });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

//다른 유저 디테일
export const getOtherUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ id });
    if (!user) {
      throw new Error("해당 유저를 찾을 수 없습니다.");
    }
    return res.status(200).json({ status: "success", user, token });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
