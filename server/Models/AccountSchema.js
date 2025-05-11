import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  nisn: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { secure_url: String, public_id: String },
  grade: { type: String, default: "" },
  idMajor: { type: mongoose.Schema.Types.ObjectId, ref: "Major" },
  role: { type: String, default: "user" },
  status: { type: String, default: "belum lulus" },
  generation: {
    type: String,
    default: function () {
      const BASE_YEAR = 1999;
      const currentYear = new Date().getFullYear();
      return `Angkatan ${currentYear - BASE_YEAR + 1}`;
    },
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString().slice(0, 10),
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
