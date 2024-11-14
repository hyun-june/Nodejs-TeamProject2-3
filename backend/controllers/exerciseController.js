import { Exercise } from "../Model/Exercise.js";

export const getAllExercise = async (req, res) => {
  try {
    const exercise = await Exercise.find();
    res.status(200).json({ status: "success", data: exercise });
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
    const { name, category, calorieBurnCriteria, mets, description } = req.body;

    const newExercise = await Exercise.create({
      name,
      category,
      calorieBurnCriteria,
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
    const { name, category, calorieBurnCriteria, mets, description } = req.body;

    const exercise = await Exercise.findByIdAndUpdate(
      id,
      {
        name,
        category,
        calorieBurnCriteria,
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
