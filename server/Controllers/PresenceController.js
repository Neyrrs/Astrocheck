import Presence from "../models/PresenceSchema.js";

// ✅ Menyimpan kehadiran dengan format tanggal & waktu yang benar
export const savePresence = async (req, res) => {
  try {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const formattedTime = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }); // HH:mm

    const newPresence = new Presence({
      ...req.body,
      date: formattedDate,
      time: formattedTime,
    });

    await newPresence.save();
    res.status(201).json({ message: "Presensi berhasil disimpan", data: newPresence });
  } catch (error) {
    res.status(400).json({ message: "Gagal menyimpan data", error: error.message });
  }
};

// ✅ Mengambil semua log berdasarkan NISN
export const getLogs = async (req, res) => {
  try {
    const { nisn } = req.params;
    const logs = await Presence.find({ nisn });

    if (!logs.length) {
      return res.status(404).json({ message: "Tidak ada data presensi untuk NISN ini" });
    }

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mengambil log berdasarkan alasan
export const getMeminjam = async (req, res) => getLogsByReason(req, res, "Meminjam");
export const getMembaca = async (req, res) => getLogsByReason(req, res, "Membaca");
export const getLainnya = async (req, res) => getLogsByReason(req, res, "Lainnya");

// 🔄 Fungsi helper untuk mengambil log berdasarkan alasan
const getLogsByReason = async (req, res, reason) => {
  try {
    const logs = await Presence.find({ alasan: reason });
    res.json({ count: logs.length, data: logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mengambil log presensi untuk hari ini
export const getLogsToday = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const logs = await Presence.find({ date: today });

    res.json({ date: today, count: logs.length, data: logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mengambil jumlah log per bulan untuk tahun ini
export const getLogsPerMonth = async (req, res) => getLogsPerYear(req, res, new Date().getFullYear());

// ✅ Mengambil jumlah log per bulan untuk tahun lalu
export const getLogsLastYear = async (req, res) => getLogsPerYear(req, res, new Date().getFullYear() - 1);

// 🔄 Fungsi helper untuk mendapatkan jumlah log per bulan berdasarkan tahun tertentu
const getLogsPerYear = async (req, res, year) => {
  try {
    const logsPerMonth = await Presence.aggregate([
      {
        $match: { date: { $regex: `^${year}-` } } // Cari berdasarkan tahun (format YYYY-MM-DD)
      },
      {
        $group: {
          _id: { $substr: ["$date", 5, 2] }, // Ambil bulan dari tanggal
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } // Urutkan berdasarkan bulan
      }
    ]);

    // Ubah format hasil agar setiap bulan memiliki nilai default 0 jika tidak ada data
    const monthData = Array.from({ length: 12 }, (_, i) => ({
      month: String(i + 1).padStart(2, "0"), // Format bulan "01", "02", ..., "12"
      count: 0
    }));

    logsPerMonth.forEach(({ _id, count }) => {
      const monthIndex = parseInt(_id, 10) - 1;
      monthData[monthIndex].count = count;
    });

    res.json({ year, logsPerMonth: monthData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
