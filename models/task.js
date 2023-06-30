import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,

    required: true,
    ref: "TODOUSER",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

export const TASK = mongoose.model("TASK", schema);