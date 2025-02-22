import jwt from "jsonwebtoken";
import User from "../models/AccountSchema.js"; 

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan atau salah format." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("-password"); 
    if (!user) return res.status(404).json({ message: "User tidak ditemukan!" });

    req.user = user; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token tidak valid atau telah kedaluwarsa!" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak! Anda bukan admin." });
  }
  next();
};
