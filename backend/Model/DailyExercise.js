import mongoose from "mongoose";

const dailyExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
});
