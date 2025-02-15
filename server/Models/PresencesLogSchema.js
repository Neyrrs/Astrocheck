import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  fullName: {     
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  alasan: {
    type: String,
    required: true,
  },
});

const log = mongoose.model("log", logSchema);
export default log;
