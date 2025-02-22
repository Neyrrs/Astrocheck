import jwt from "jsonwebtoken";
import User from "../models/AccountSchema.js";

export const loginUser = async (req, res) => {
  try {
    const { nisn, password } = req.body;

    const user = await User.findOne({ nisn });
    if (!user) {
      return res.status(404).json({ message: "Akun tidak ditemukan!" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      { id: user._id, nisn: user.nisn, fullName: user.fullName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.status(200).json({
      message: "Login berhasil!",
      token,
      user: {
        nisn: user.nisn,
        fullName: user.fullName,
        email: user.email,
        kelas: user.kelas,
        jurusan: user.jurusan,
        profilePicture: user.profilePicture,
        nickname: user.nickname || "",
        role: user.role || "user"
      },
    });
  } catch (error) {
    console.log("Error login:", error);
    return res.status(500).json({ message: "Server error!" });
  }
  createLog(req, res);
};

export const registerUser = async (req, res) => {
  try {
    const {
      nisn,
      fullName,
      email,
      password,
      kelas,
      jurusan,
      nickname,
      profilePicture,
      role
    } = req.body;

    const existingUser = await User.findOne({ nisn });
    if (existingUser)
      return res.status(400).json({ message: "NISN sudah terdaftar!" });

    const newUser = new User({
      nisn,
      fullName,
      email,
      password,
      kelas,
      jurusan,
      nickname,
      profilePicture,
      role
    });
    await newUser.save();

    res.status(201).json({ message: "Akun berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, nickname, email, password } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (fullName) user.fullName = fullName;
    if (nickname) user.nickname = nickname;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({ message: "Profil berhasil diperbarui", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui profil", error });
  }
};
