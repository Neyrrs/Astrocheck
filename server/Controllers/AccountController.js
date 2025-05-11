import jwt from "jsonwebtoken";
import User from "../Models/AccountSchema.js";
import Major from "../Models/MajorSchema.js";
import cloudinary from "../Config/Cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const loginUser = async (req, res) => {
  try {
    const { nisn, password } = req.body;

    const user = await User.findOne({ nisn }).populate("idMajor", "major_name");
    if (!user) {
      return res.status(404).json({ message: "Akun tidak ditemukan!" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        nisn: user.nisn,
        fullName: user.fullName,
        role: user.role,
        major: user.idMajor ? user.idMajor.major_name : null,
      },
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
        grade: user.grade,
        idMajor: user.idMajor ? user.idMajor.major_name : null,
        profilePicture: user.profilePicture,
        nickname: user.nickname || "",
        role: user.role || "student",
      },
    });
  } catch (error) {
    console.log("Error login:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const {
      nisn,
      fullName,
      email,
      password,
      grade,
      major_name,
      profilePicture,
      role,
    } = req.body;

    const Idmajor = await Major.findOne({ major_name: major_name });
    if (!Idmajor)
      return res.status(404).json({ message: "Major tidak ditemukan!" });

    const existingUser = await User.findOne({ nisn });
    if (existingUser)
      return res.status(400).json({ message: "NISN sudah terdaftar!" });

    let cloudinaryUrl = profilePicture;
    if (req.files && req.files.profilePicture) {
      const file = req.files.profilePicture;
      const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "user_profile_pictures",
      });
      cloudinaryUrl = result.secure_url;
    }

    const newUser = new User({
      nisn,
      fullName,
      email,
      password,
      profilePicture: cloudinaryUrl,
      grade,
      idMajor: Idmajor._id,
      role,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Akun berhasil dibuat!", response: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("idMajor", "major_code major_name")
      .select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password").populate({
      path: "idMajor",
      select: "major_code major_name -_id",
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProfile = [
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { nickname, email, password } = req.body;
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

      if (nickname) user.nickname = nickname;
      if (email) user.email = email;
      if (password) user.password = password;

      // Jika ada file gambar baru yang diupload
      if (req.file) {
        // Hapus gambar lama kalau ada
        if (user.profilePicture?.public_id) {
          try {
            await cloudinary.v2.uploader.destroy(user.profilePicture.public_id);
          } catch (error) {
            console.warn("Gagal hapus gambar lama:", error);
          }
        }

        // Upload gambar baru ke Cloudinary
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "user_profile_pictures" },
          async (error, result) => {
            if (error) {
              return res.status(500).json({ message: "Gagal upload gambar", error });
            }

            user.profilePicture = {
              secure_url: result.secure_url,
              public_id: result.public_id,
            };

            await user.save();
            res.status(200).json({ message: "Profil berhasil diperbarui", user });
          }
        );

        uploadStream.end(req.file.buffer);
        return;
      }

      await user.save();
      res.status(200).json({ message: "Profil berhasil diperbarui", user });
    } catch (error) {
      console.error("Error in updateProfile:", error);
      res.status(500).json({ message: "Terjadi kesalahan saat memperbarui profil", error });
    }
  }
];


export const deleteProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (user.profilePicture) {
      const publicId = user.profilePicture.split("/").pop().split(".")[0];
      await cloudinary.v2.uploader.destroy(publicId);
      user.profilePicture = "";
    }

    await user.save();

    res.status(200).json({ message: "Gambar profil berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat menghapus gambar profil",
        error,
      });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (user.profilePicture) {
      const publicId = user.profilePicture.split("/").pop().split(".")[0];
      await cloudinary.v2.uploader.destroy(publicId);
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Akun berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus akun", error });
  }
};
