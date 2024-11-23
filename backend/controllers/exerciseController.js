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
    const { exercise, quantity } = req.body;
    const { name, category, mets } = exercise;
    const userDetail = await UserDetail.findOne({ user: userId }).exec();

    console.log("userId??", userId);
    console.log("date??", date);
    console.log("exercise??", exercise);
    if (!userId) {
      return res
        .status(400)
        .json({ status: "fail", message: "로그인이 필요합니다." });
    }

    if (!exercise || !quantity || !date) {
      return res.status(400).json({
        status: "fail",
        message: "필수 정보가 누락되었습니다.",
      });
    }

    const dailyExercise = await DailyExercise.create({
      user: userId,
      name,
      category,
      mets,
      durationOrDistance: quantity,
      date,
    });

    res.status(200).json({ status: "success", data: dailyExercise });
  } catch (error) {
    console.error("Server Error:", error); // 에러 내용을 로그로 출력
    res
      .status(500)
      .json({ status: "fail", message: "운동 추가에 실패했습니다." });
  }
};

export const getDailyExercise = async (req, res) => {
  const { userId } = req;
  const { date } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "로그인이 필요합니다." });
  }
  if (!date || !date.data) {
    return res.status(400).json({ message: "날짜가 필요합니다." });
  }

  // 날짜 유효성 검사
  const parsedDate = new Date(date.data);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: "유효하지 않은 날짜입니다." });
  }

  const startOfDay = new Date(date.data);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date.data);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const dailyExercise = await DailyExercise.find({
      user: userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const userDetail = await UserDetail.findOne({ user: userId }).select(
      "weight"
    );
    if (!userDetail) throw new Error("UserDetail 정보를 찾을 수 없습니다.");

    res.status(200).json({
      status: "success",
      data: dailyExercise,
      weight: userDetail.weight,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error });
  }
};

export const updateDailyExercise = async (req, res) => {
  try {
    const { quantity, exerciseId } = req.body;

    const updateExercise = await DailyExercise.findByIdAndUpdate(
      exerciseId,
      { durationOrDistance: quantity },
      { new: true }
    );

    if (!updateExercise) {
      return res
        .status(404)
        .json({ status: "fail", message: "해당 운동을 찾을 수 없습니다." });
    }
    res.status(200).json({ status: "success", data: updateExercise });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "해당 운동 수정에 실패했습니다",
      error,
    });
  }
};
