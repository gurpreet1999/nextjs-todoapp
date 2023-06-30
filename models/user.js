import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
   
  },
});

//ye wlaa thing bhtt important he
mongoose.models = {};

export const TODOUSER = mongoose.model("TODOUSER", schema);