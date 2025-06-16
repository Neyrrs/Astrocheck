export const checkLocalIP = (req, res, next) => {
  const forwarded = req.headers["x-forwarded-for"];
  const remoteIP = forwarded || req.connection.remoteAddress || "";

  const allowedPatterns = ["::ffff:192.168.2.", "192.168.1.6"];

  const isLocal = allowedPatterns.some((pattern) => remoteIP.startsWith(pattern));

  if (!isLocal) {
    return res.status(403).json({
      success: false,
      message: "Akses presensi hanya tersedia di jaringan perpustakaan.",
    });
  }

  next();
};
