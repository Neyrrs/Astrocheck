import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  NISN: {
    type: String,
    required: true,
  },
  fullName: {     
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  alasan: {
    type: String,
    required: true,
  },
});

const log = mongoose.model("log", logSchema);
export default log;
