import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    id: { tpye: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: Array, required: true },
    nutrient: [
      {
        Carbohydrate: { type: String, required: true },
        Protein: { type: String, required: true },
        Fat: { type: String, required: true },
      },
    ],
    defaultGram: { type: Number },
    calorie: { type: Number },
  },
  { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);
