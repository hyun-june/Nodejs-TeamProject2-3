import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: Array, required: true },
    nutrient: [
      {
        Carbohydrate: { type: Number, required: true },
        Protein: { type: Number, required: true },
        Fat: { type: Number, required: true },
      },
    ],
    defaultGram: { type: Number },
    calorie: { type: Number },
    date: { type: Date, default: Date.now }, // 날짜 필드 추가\
  },
  { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);
