import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  nisn: { type: String, required: true, unique: true },
  fullName: {type: String, required: true},
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  kelas: { type: String, required: true },
  jurusan: { type: String, required: true },
  nickname: { type: String, default: "" },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
