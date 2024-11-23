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
    const { userId } = req;

    const user = await User.findById(userId).populate("detailInfo");

    if (user) {
      return res.status(200).json({ status: "success", user });
    }
    throw new Error("Invalid Token");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// 다른 유저 정보 가져오기
export const getOtherUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("detailInfo");
    console.log("다른유저정보", user);
    if (!user) {
      throw new Error("해당 유저를 찾을 수 없습니다.");
    }
    return res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//유저 디테일 페이지 저장하기
export const postUserDetail = async (req, res) => {
  try {
    const { userId } = req;
    const { age, height, weight, purpose, nickname } = req.body;
    const profileImg = req.file ? req.file.path : req.body.profileImg;

    const newUserDetail = await UserDetail.create({
      user: userId,
      nickname,
      age,
      height,
      weight,
      purpose,
      profileImg,
    });

    // 생성한 UserDetail의 ID를 User 스키마의 detailInfo에 추가
    await User.findByIdAndUpdate(
      userId,
      { $push: { detailInfo: newUserDetail._id } }, // detailInfo 배열에 추가
      { new: true } // 업데이트된 유저 데이터를 반환하도록 설정
    );

    res.status(201).json({ status: "success", data: newUserDetail });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

//유저 디테일 페이지 가져오기
export const getUserDetail = async (req, res) => {
  try {
    const { userId } = req;
    const userDetail = await UserDetail.findOne({ user: userId });

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
  console.log("요청 도착: ", req.body); // 백엔드에 요청이 도달하는지 확인
  try {
    const { userId } = req;
    const { profileUrl, nickname, age, height, weight, purpose } = req.body;

    // 값이 비어있거나 누락된 경우 처리
    if (age == null || height == null || weight == null || purpose == null) {
      throw new Error("빈 칸을 채워주세요.");
    }

    const userDetail = await UserDetail.findOneAndUpdate(
      { user: userId },
      { profileUrl, nickname, age, height, weight, purpose },
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
