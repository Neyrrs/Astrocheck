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
  },
  {
    timestamps: true,
  }
);

const Major = mongoose.models.Major || mongoose.model("Major", MajorSchema);
export default Major;
