import mongoose from "mongoose";

const MajorSchema = new mongoose.Schema(
  {
    major_code: {
      type: String,
      required: true,
      unique: true,
    },
    major_name: {
      type: String,
      required: true,
    },
    majorFullName: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Major = mongoose.models.Major || mongoose.model("Major", MajorSchema);
export default Major;
