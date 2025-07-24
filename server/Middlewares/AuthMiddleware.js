import jwt from "jsonwebtoken";
import { supabase } from "../Config/Supabase.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          message: "Akses ditolak! Token tidak ditemukan atau format salah.",
        });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Token tidak valid atau telah kedaluwarsa!" });
    }

    const { data: user, error } = await supabase
      .from("table_user")
      .select("*, id_major:table_major(major_name)")
      .eq("id_user", decoded.id_user).single();
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    req.user = {
      id_user: user.id_user,
      nis: user.nis,
      fullName: user.fullName,
      role: user.role,
      major: user.id_major ? user.id_major.major_name : null,
    };

    next();
  } catch (error) {
    console.error("Authenticate User Error:", error);
    return res.status(500).json({ message: "Server error saat autentikasi!" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Akses ditolak! Anda tidak memiliki izin admin." });
  }
  next();
};
