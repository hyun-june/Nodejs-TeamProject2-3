import mongoose from "mongoose";
import { Food } from "./Food";

const dailyFoodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    mealtype: {
      type: String,
      enum: ["아침", "점심", "저녁", "간식"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, //g 표기
    },
    totalCalories: { type: Number, required: true, min: 0 },
    nutrition: {
      carbs: { type: Number, required: true, min: 0 },
      protein: { type: Number, required: true, min: 0 },
      fat: { type: Number, required: true, min: 0 },
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//음식 칼로리를 계산하는 미들웨어
dailyFoodSchema.pre("save", async function (next) {
  //음식 정보를 가져옴
  const food = await mongoose.model("Food").findById(this.foodId);

  if (!food) {
    return next(new Error("음식 정보를 찾을 수 없습니다"));
  }

  // 1인분에 해당하는 그램 수를 기반으로 칼로리와 영양 성분 계산
  const gramsPerServing = food.defaultGram; // 1인분에 해당하는 그램 수
  const totalGrams = this.quantity * gramsPerServing; // 유저가 입력한 인분 수에 해당하는 총 그램 수

  // 총 칼로리 계산 : 1인분 기준 칼로리 * 유저가 입력한 인분 수
  this.totalCalories = food.calories * this.quantity;

  // 영양 선분 계산 : 1인분 기준 영양 성분 * 유저가 입력한 인분 수
  this.nutrition.carbs = food.nutrient.Carbohydrate * this.quantity;
  this.nutrition.protein = food.nutrient.Protein * this.quantity;
  this.nutrition.fat = food.nutrient.Fat * this.quantity;

  next();
});

export const dailyFood = mongoose.model("dailyFood", dailyFoodSchema);
