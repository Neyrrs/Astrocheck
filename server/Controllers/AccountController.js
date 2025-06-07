import jwt from "jsonwebtoken";
import User from "../Models/AccountSchema.js";
import Major from "../Models/MajorSchema.js";
import cloudinary from "../Config/Cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const loginUser = async (req, res) => {
  try {
    const { nis, password } = req.body;

    const user = await User.findOne({ nis }).populate("idMajor", "major_name");
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
        nis: user.nis,
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
    });
  } catch (error) {
    console.log("Error login:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const registerUser = [
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const {
        nis,
        fullName,
        password,
        grade,
        status,
        generation,
        major_name,
        role,
        createdAt,
      } = req.body;

      const major = await Major.findOne({ major_name });
      if (!major)
        return res.status(404).json({ message: "Major tidak ditemukan!" });

      const enteredYear = 2000 + parseInt(generation) - 2;
      const graduationYear = enteredYear + parseInt(major.duration);

      const existingUser = await User.findOne({ nis });
      if (existingUser)
        return res.status(400).json({ message: "nis sudah terdaftar!" });

      let profilePictureCloud = "";

      if (req.file) {
        const streamUpload = cloudinary.v2.uploader.upload_stream(
          { folder: "user_profile_pictures" },
          async (error, result) => {
            if (error) {
              return res
                .status(500)
                .json({ message: "Gagal upload gambar", error });
            }

            profilePictureCloud = {
              secure_url: result.secure_url,
              public_id: result.public_id,
            };

            const newUser = new User({
              nis,
              fullName,
              password,
              profilePicture: profilePictureCloud,
              grade,
              idMajor: major?._id,
              role,
              status,
              generation,
              graduationYear,
              createdAt,
            });

            await newUser.save();
            return res
              .status(201)
              .json({ message: "Akun berhasil dibuat!", response: newUser });
          }
        );

        streamUpload.end(req.file.buffer);
      } else {
        const newUser = new User({
          nis,
          fullName,
          password,
          profilePicture: "",
          grade,
          idMajor: major._id,
          role,
          status,
          generation,
          graduationYear,
          createdAt,
        });

        await newUser.save();
        return res
          .status(201)
          .json({ message: "Akun berhasil dibuat!", response: newUser });
      }
    } catch (error) {
      console.error("Error di registerUser:", error);
      res.status(500).json({ message: "Server error!", error });
    }
  },
];

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
      select: "major_code major_name duration majorFullName -_id",
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
      const updates = req.body;
      const userId = req.params.id;

      const user = await User.findById(userId);
      if (!user)
        return res.status(404).json({ message: "User tidak ditemukan" });

      const allowedFields = [
        "nis",
        "fullName",
        "grade",
        "major",
        "generation",
        "status",
        "createdAt",
        "role",
      ];

      for (const key of allowedFields) {
        if (updates[key] && updates[key] !== user[key]) {
          user[key] = updates[key];
        }
      }

      if (req.file) {
        if (user.profilePicture?.public_id) {
          try {
            await cloudinary.v2.uploader.destroy(user.profilePicture.public_id);
          } catch (error) {
            console.warn("Gagal menghapus foto lama:", error.message);
          }
        }

        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "user_profile_pictures" },
          async (error, result) => {
            if (error) {
              return res
                .status(500)
                .json({ message: "Gagal mengunggah foto profil", error });
            }

            user.profilePicture = {
              secure_url: result.secure_url,
              public_id: result.public_id,
            };

            await user.save();
            return res
              .status(200)
              .json({ message: "Profil berhasil diperbarui", user });
          }
        );

        uploadStream.end(req.file.buffer);
        return;
      }

      await user.save();
      return res
        .status(200)
        .json({ message: "Profil berhasil diperbarui", user });
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return res.status(500).json({
        message: "Terjadi kesalahan saat memperbarui profil",
        error: error.message,
      });
    }
  },
];

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.profilePicture.leghth > 0) {
      const publicId = user.profilePicture.public_id
        .split("/")
        .pop()
        .split(".")[0];
      await cloudinary.v2.uploader.destroy(publicId);
    }

    await User.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Akun dan gambar profil berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus akun",
      error,
    });
  }
};
