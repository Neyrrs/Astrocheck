import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase } from "../config/Supabase.js";
import cloudinary from "../middlewares/CloudinaryUpload.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const handleProfilePicture = (req, res, next) => {
  upload.single("profile_picture")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Error uploading file" });
    } else if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    next();
  });
};

export const loginUser = async (req, res) => {
  try {
    const { nis, password } = req.body;

    const { data: user, error } = await supabase
      .from("table_user")
      .select("*, id_major:table_major(major_name)")
      .eq("nis", nis)
      .single();

    if (!user || error) {
      return res.status(404).json({ message: "Akun tidak ditemukan!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      {
        id_user: user.id_user,
        nis: user.nis,
        fullname: user.fullname,
        role: user.role,
        major: user.id_major?.major_name || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.status(200).json({
      message: "Login berhasil!",
      token,
      id_user: user.id_user,
      nis: user.nis,
      fullname: user.fullname,
      grade: user.grade,
      id_major: user.id_major?.major_name || null,
      profile_picture: user.profile_picture,
      nickname: user.nickname || "",
      role: user.role || "student",
      streak: user.streak || 0,
    });
  } catch (error) {
    console.error("Error login:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const {
      nis,
      fullname,
      password,
      grade,
      status,
      generation,
      major_name,
      role,
    } = req.body;

    const { data: major, error: majorError } = await supabase
      .from("table_major")
      .select("*")
      .eq("major_name", major_name)
      .single();

    if (!major) {
      return res.status(404).json({ message: "Major tidak ditemukan!" });
    }

    const enteredYear = 2000 + parseInt(generation) - 2;
    const graduationYear = enteredYear + parseInt(major.duration);

    const { data: existingUser } = await supabase
      .from("table_user")
      .select("id_user")
      .eq("nis", nis)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "NIS sudah terdaftar!" });
    }

    let profilePictureUrl = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "user_profile_pictures" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      profilePictureUrl = uploadResult.secure_url;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const { error: insertError } = await supabase.from("table_user").insert([
      {
        nis,
        fullname,
        password: password_hash,
        profile_picture: profilePictureUrl,
        grade,
        id_major: major.id_major,
        role,
        status,
        generation,
        graduation_year: graduationYear,
      },
    ]);

    if (insertError) throw insertError;

    return res.status(201).json({ message: "Akun berhasil dibuat!" });
  } catch (error) {
    console.error("Error di registerUser:", error);
    res.status(500).json({ message: "Server error!", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.params.id;

    const { data: user, error: userError } = await supabase
      .from("table_user")
      .select("*")
      .eq("id_user", userId)
      .single();

    if (!user || userError) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "user_profile_pictures" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updates.profile_picture = uploadResult.secure_url;
    }

    const { error } = await supabase
      .from("table_user")
      .update(updates)
      .eq("id_user", userId);

    if (error) throw error;

    return res.status(200).json({ message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const { error } = await supabase
      .from("table_user")
      .delete()
      .eq("id_user", userId);

    if (error) throw error;

    res.status(200).json({ message: "Akun berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus akun",
      error,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id_user;

    const { data: user, error } = await supabase
      .from("table_user")
      .select("*, id_major:table_major(major_name)")
      .eq("id_user", userId)
      .single();

    if (!user || error) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    return res.status(200).json({
      id_user: user.id_user,
      nis: user.nis,
      fullname: user.fullname,
      grade: user.grade,
      major: user.id_major?.major_name || null,
      profile_picture: user.profile_picture,
      nickname: user.nickname || "",
      role: user.role || "student",
      streak: user.streak || 0,
      status: user.status,
      generation: user.generation,
      graduation_year: user.graduation_year,
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from("table_user")
      .select("*, id_major:table_major(major_name)")
      .order("fullname", { ascending: true });

    if (error) throw error;

    const formattedUsers = users.map((user) => ({
      id_user: user.id_user,
      nis: user.nis,
      fullname: user.fullname,
      grade: user.grade,
      major: user.id_major?.major_name || null,
      profile_picture: user.profile_picture,
      role: user.role,
      status: user.status,
      streak: user.streak || 0,
      generation: user.generation,
      graduation_year: user.graduation_year,
    }));

    return res.status(200).json({ users: formattedUsers });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const getMostStreakUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from("table_user")
      .select("*, id_major:table_major(major_name)")
      .order("streak", { ascending: false })
      .limit(10);

    if (error) throw error;

    const formattedUsers = users.map((user) => ({
      id_user: user.id_user,
      nis: user.nis,
      fullname: user.fullname,
      grade: user.grade,
      major: user.id_major?.major_name || null,
      profile_picture: user.profile_picture,
      streak: user.streak || 0,
    }));

    return res.status(200).json({ users: formattedUsers });
  } catch (error) {
    console.error("Error in getMostStreakUsers:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "Tidak ada file yang diunggah" });
    }

    const { data: user, error: userError } = await supabase
      .from("table_user")
      .select("profile_picture")
      .eq("id_user", userId)
      .single();

    if (!user || userError) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "user_profile_pictures" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const { error } = await supabase
      .from("table_user")
      .update({ profile_picture: uploadResult.secure_url })
      .eq("id_user", userId);

    if (error) throw error;

    return res.status(200).json({
      message: "Foto profil berhasil diperbarui",
      profile_picture: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Error in updateProfilePicture:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui foto profil",
      error: error.message,
    });
  }
};
