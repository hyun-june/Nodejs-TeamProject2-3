import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: [{ type: Array, required: true }],
    // calorieBurnCriteria: {
    //   criteria: {
    //     type: String,
    //     required: true,
    //   },
    //   criteriaValue: {
    //     type: Number,
    //     required: true,
    //     min: 0,
    //   },
    // },
    //METs 값: 운동 강도를 나타내는 값
    mets: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const Exercise = mongoose.model("Exercise", exerciseSchema);
