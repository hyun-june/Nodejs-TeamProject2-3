import { DailyFood } from "../Model/DailyFood.js";
import { Food } from "../Model/Food.js";

export const getDailyFood = async (req, res) => {
  const { userId } = req;
  const { date } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "로그인이 필요합니다." });
  }
  if (!date) {
    return res.status(400).json({ message: "날짜가 필요합니다." });
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const dailyFood = await DailyFood.find({
      user: userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const result = {
      아침: [],
      점심: [],
      저녁: [],
      간식: [],
    };

    dailyFood.forEach((food) => {
      if (result[food.mealtype]) {
        result[food.mealtype].push({
          foodId: food._id,
          food: food.name,
          quantity: food.quantity,
          calories: food.Calories,
          defaultGram: food.defaultGram,
          nutrition: food.nutrition,
        });
      }
    });
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "서버 오류" });
  }
};

export const getSearchFood = async (req, res) => {
  try {
    const { q } = req.query;
    const search = {};

    if (q) {
      search.name = { $regex: q, $options: "i" };
    }

    const food = await Food.find(search);

    if (food.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "검색결과가 없습니다.",
      });
    }
    res.status(200).json({ status: "success", data: food });
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({
      status: "fail",
      message: "서버 오류",
    });
  }
};

export const postDailyFood = async (req, res) => {
  try {
    const { userId } = req;
    const { date } = req.query;
    const { food, mealtype, quantity } = req.body;
    const { name, category, nutrient, calorie, defaultGram } = food;

    if (!userId) {
      return res
        .status(400)
        .json({ status: "fail", message: "로그인이 필요합니다." });
    }
    // 유효성 검사
    if (!food || !mealtype || !quantity) {
      return res.status(400).json({
        status: "fail",
        message: "필수 정보가 누락되었습니다.",
      });
    }

    const meal = await DailyFood.create({
      user: userId,
      name,
      category,
      mealtype,
      quantity,
      Calories: calorie,
      defaultGram,
      date,
      nutrition: {
        Carbohydrate: nutrient[0]?.Carbohydrate,
        Protein: nutrient[0]?.Protein,
        Fat: nutrient[0]?.Fat,
      },
    });

    res.status(200).json({
      status: "success",
      message: `${mealtype}에 음식이 추가되었습니다.`,
      data: meal,
    });
  } catch (error) {
    console.error("Server Error:", error); // 에러 내용을 로그로 출력
    res
      .status(500)
      .json({ status: "fail", message: "음식 추가에 실패했습니다." });
  }
};

export const updateDailyFood = async (req, res) => {
  try {
    const { quantity, foodId } = req.body;

    const updateFood = await DailyFood.findByIdAndUpdate(
      foodId,
      { quantity },
      { new: true }
    );

    if (!updateFood) {
      return res
        .status(404)
        .json({ status: "fail", message: "해당 음식을 찾을 수 없습니다" });
    }
    res.status(200).json({ status: "success", data: updateFood });
  } catch (error) {
    res
      .status(500)
      .json({ status: "fail", message: "음식상태 수정에 실패했습니다", error });
  }
};

export const deleteDailyFood = async (req, res) => {
  try {
    const { foodId } = req.body; // 정상적으로 foodId를 받을 수 있음
    const food = await DailyFood.findByIdAndDelete(foodId);

    if (!food) {
      return res
        .status(404)
        .json({ status: "fail", message: "해당 음식을 찾을 수 없습니다." });
    }
    res.status(200).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "fail", message: "음식 삭제에 실패했습니다.", error });
  }
};
