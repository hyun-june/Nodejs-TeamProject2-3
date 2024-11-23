import mongoose from "mongoose";

const dailyWeightSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weight: { type: Number, required: true },
    date: { type: String,  required: true },
  },
  { timestamps: true }
);

export const DailyWeight = mongoose.model("DailyWeight", dailyWeightSchema);
