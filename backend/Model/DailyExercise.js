import mongoose from "mongoose";

const dailyExerciseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      required: true,
    },
    category: [{ type: Array, required: true }],
    mets: { type: Number, required: true },
    durationOrDistance: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const DailyExercise = mongoose.model(
  "dailyExercise",
  dailyExerciseSchema
);
