import { DailyExercise } from "../Model/DailyExercise.js";
import { Exercise } from "../Model/Exercise.js";
import { UserDetail } from "../Model/UserDetail.js";

export const getAllExercise = async (req, res) => {
  try {
    const { page, q, size } = req.query;
    const cond = q ? { name: { $regex: q, $options: "i" } } : {};

    let query = Exercise.find(cond).sort({ createdAt: -1 });
    let response = { status: "success" };

    if (page && size) {
      query.skip((page - 1) * size).limit(size);
      const totalItemNum = await Exercise.countDocuments(cond);
      response.totalPageNum = Math.ceil(totalItemNum / size);
    }

    const exercise = await query.exec();
    response.data = exercise;

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "운동 데이터를 가져오는 데 오류가 발생했습니다.",
      error,
    });
  }
};

export const postExercise = async (req, res) => {
  try {
    const { name, category, mets, description } = req.body;
    const newExercise = await Exercise.create({
      name,
      category,
      mets,
      description,
    });

    res.status(200).json({ status: "success", data: newExercise });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "운동을 추가하는 데 오류가 발생했습니다",
      error,
    });
  }
};

export const getExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findById(id);

    if (!exercise) {
      throw new Error("해당 운동을 찾을 수 없습니다.");
    }
    res.status(200).json({ status: "success", data: exercise });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};

export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, mets, description } = req.body;
    console.log(id, req.body);
    const exercise = await Exercise.findByIdAndUpdate(
      id,
      {
        name,
        category,
        mets,
        description,
      },
      { new: true }
    );
    if (!exercise) throw new Error("수정하려는 운동이 존재하지 않습니다.");
    res.status(200).json({ status: "success", data: exercise });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};

export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) throw new Error("삭제할 운동이 없습니다");
    res.status(200).json({ status: "success", data: exercise });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

export const postDailyExercise = async (req, res) => {
  try {
    const { userId } = req;
    const { date } = req.query;
    const { exercise, time } = req.body;
    const { name, category, mets, durationOrDistance } = exercise;
    const userDetail = await UserDetail.findOne({ user: userId }).exec();

    if (!userId) {
      return res
        .status(400)
        .json({ status: "fail", message: "로그인이 필요합니다." });
    }

    if (!exercise || !time || !date) {
      return res.status(400).json({
        status: "fail",
        message: "필수 정보가 누락되었습니다.",
      });
    }

    if (!userDetail) {
      return res.status(400).json({
        status: "fail",
        message: "사용자 세부 정보가 누락되었습니다.",
      });
    }

    const dailyExercise = await DailyExercise.create({
      user: userId,
      name,
      category,
      mets,
      durationOrDistance,
      date,
      weight: userDetail.weight,
    });

    res.status(200).json({ status: "success", data: dailyExercise });
  } catch (error) {
    console.error("Server Error:", error); // 에러 내용을 로그로 출력
    res
      .status(500)
      .json({ status: "fail", message: "운동 추가에 실패했습니다." });
  }
};
