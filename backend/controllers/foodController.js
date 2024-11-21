import { Food } from "../Model/Food.js";

export const getAllFood = async (req, res) => {
  try {
    const food = await Food.find();
    res.status(200).json({ status: "success", data: food });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "음식 데이터를 가져오는 데 오류가 발생했습니다.",
      error,
    });
  }
};

export const postFood = async (req, res) => {
  try {
    const { name, category, nutrient, defaultGram, calorie } = req.body;

    const newFood = await Food.create({
      name,
      category,
      nutrient,
      defaultGram,
      calorie,
    });
    res.status(200).json({ status: "success", data: newFood });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "음식을 추가하는 데 오류가 발생했습니다",
      error,
    });
  }
};

export const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);

    if (!food) {
      throw new Error("해당 음식을 찾을 수 없습니다.");
    }
    res.status(200).json({ status: "success", data: food });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, nutrient, defaultGram, calorie } = req.body;

    const food = await Food.findByIdAndUpdate(
      id,
      {
        name,
        category,
        nutrient,
        defaultGram,
        calorie,
      },
      { new: true }
    );
    if (!food) throw new Error("수정하려는 음식이 존재하지 않습니다.");
    res.status(200).json({ status: "success", data: food });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) throw new Error("삭제할 음식이 없습니다");
    res.status(200).json({ status: "success", data: food });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
