import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan atau salah format." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Akses ditolak! Token tidak tersedia." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(403).json({ message: "Token tidak valid!" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token tidak valid atau telah kedaluwarsa!" });
  }
};

export default AuthMiddleware;
