import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan data user di request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token tidak valid!" });
  }
};

export default AuthMiddleware;
