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
      console.log("food", food);
      if (result[food.mealtype]) {
        result[food.mealtype].push({
          food: food.name,
          quantity: food.quantity,
          calories: food.Calories,
          defaultGram: food.defaultGram,
          nutrition: food.nutrition,
        });
      }
    });
    res.status(200).json({ status: "success", data: result });
    console.log(result);
  } catch (error) {
    res.status(500).json({ status: "fail", message: "서버 오류" });
  }
};

export const getSearchFood = async (req, res) => {
  try {
    const { q, date } = req.query;
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
    const { food, mealtype, quantity } = req.body;
    const { name, category, nutrient, calorie, defaultGram } = food;
    console.log("ggggg", defaultGram);

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

    // quantity에 맞게 칼로리와 영양소 계산 (기본량에 비례해서 곱하기)
    const totalCalories = calorie * quantity; // 음식의 기본 칼로리와 quantity에 맞게 조정된 칼로리
    const totalCarbs = nutrient[0]?.Carbohydrate * quantity; // 음식의 기본 탄수화물과 quantity에 맞게 조정
    const totalProtein = nutrient[0]?.Protein * quantity; // 음식의 기본 단백질과 quantity에 맞게 조정
    const totalFat = nutrient[0]?.Fat * quantity; // 음식의 기본 지방과

    const meal = await DailyFood.create({
      user: userId,
      name,
      category,
      mealtype,
      quantity,
      Calories: totalCalories,
      defaultGram,
      nutrition: {
        carbs: totalCarbs,
        protein: totalProtein,
        fat: totalFat,
      },
    });

    console.log(meal);

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
