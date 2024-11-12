import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calorie: { type: Number, required: true },
  category: { type: Array, required: true },
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);
