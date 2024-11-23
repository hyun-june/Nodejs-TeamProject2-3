import mongoose from "mongoose";

const dailyWaterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, default: 0, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const DailyWater = mongoose.model("DailyWater", dailyWaterSchema);
