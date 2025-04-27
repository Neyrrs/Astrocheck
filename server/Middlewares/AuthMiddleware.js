import jwt from "jsonwebtoken";
import User from "../models/AccountSchema.js"; 

// Middleware untuk otentikasi semua user
export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan atau format salah." });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Token tidak valid atau telah kedaluwarsa!" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    req.user = {
      id: user._id,
      nisn: user.nisn,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      major: user.idMajor ? user.idMajor.major_name : null,
    };

    next();
  } catch (error) {
    console.error("Authenticate User Error:", error);
    return res.status(500).json({ message: "Server error saat autentikasi!" });
  }
};

// Middleware untuk otorisasi admin
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak! Anda tidak memiliki izin admin." });
  }
  next();
};
