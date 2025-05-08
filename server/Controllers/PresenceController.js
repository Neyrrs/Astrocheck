import Presence from "../Models/PresenceSchema.js";
import User from "../Models/AccountSchema.js";

const getPresenceCounts = async () => {
  const [membaca, meminjam, lainnya] = await Promise.all([
    Presence.countDocuments({ reason: "Membaca" }),
    Presence.countDocuments({ reason: "Meminjam" }),
    Presence.countDocuments({ reason: "Lainnya" }),
  ]);
  return [membaca, meminjam, lainnya];
};

export const savePresence = async (req, res) => {
  try {
    const { nisn } = req.user;

    const user = await User.findOne({ nisn });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10);
    const formattedTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newPresence = new Presence({
      nisn: user.nisn,
      ...req.body,
      date: formattedDate,
      time: formattedTime,
    });

    await newPresence.save();

    const count = await Presence.countDocuments();
    const [membaca, meminjam, lainnya] = await getPresenceCounts();

    res.status(201).json({
      message: "Presensi berhasil disimpan",
      data: newPresence,
      count,
      membaca,
      meminjam,
      lainnya,
    });
  } catch (error) {
    res.status(400).json({ message: "Gagal menyimpan data", error: error.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const { nisn } = req.user;

    const logs = await Presence.find({ nisn });
    if (!logs.length) {
      return res.status(404).json({ message: "Tidak ada data presensi untuk user ini" });
    }

    const user = await User.findOne({ nisn }).select("fullName grade idMajor").populate("idMajor", "major_name");

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const formattedLogs = logs.map((log) => ({
      id: log._id,
      fullName: user.fullName,
      grade: user.grade,
      major: user.idMajor?.major_name || "-",
      date: log.date,
      time: log.time,
      reason: log.reason,
      detailReason: log.detailReason || "-",
    }));

    const count = logs.length;
    const [membaca, meminjam, lainnya] = await getPresenceCounts();

    res.json({
      count,
      membaca,
      meminjam,
      lainnya,
      logs: formattedLogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsersPresence = async (req, res) => {
  try {
    const presence = await Presence.find().sort({ date: -1 }).populate({
      path: "nisn",
      model: "User",
      localField: "nisn",
      foreignField: "nisn",
      select: "fullName grade idMajor",
    });

    const count = presence.length;
    const [membaca, meminjam, lainnya] = await getPresenceCounts();

    const formattedPresence = presence.map((pres) => ({
      id: pres._id,
      fullName: pres.nisn?.fullName || "-",
      grade: pres.nisn?.grade || "-",
      major: pres.nisn?.idMajor?.major_name || "-",
      date: pres.date,
      time: pres.time,
      reason: pres.reason,
      detailReason: pres.detailReason || "-",
    }));

    res.json({
      count,
      membaca,
      meminjam,
      lainnya,
      presence: formattedPresence,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLogsToday = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const logs = await Presence.find({ date: today });

    const [membaca, meminjam, lainnya] = await Promise.all([
      Presence.countDocuments({ date: today, reason: "Membaca" }),
      Presence.countDocuments({ date: today, reason: "Meminjam" }),
      Presence.countDocuments({ date: today, reason: "Lainnya" }),
    ]);

    res.json({
      date: today,
      count: logs.length,
      membaca,
      meminjam,
      lainnya,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLogsPerYear = async (req, res, year) => {
  try {
    const logsPerMonth = await Presence.aggregate([
      { $match: { date: { $regex: `^${year}-` } } },
      { $group: { _id: { $substr: ["$date", 5, 2] }, count: { $sum: 1 } } },
      { $sort: { "_id": 1 } },
    ]);

    const monthData = Array.from({ length: 12 }, (_, i) => ({
      month: String(i + 1).padStart(2, "0"),
      count: 0,
    }));

    logsPerMonth.forEach(({ _id, count }) => {
      const monthIndex = parseInt(_id, 10) - 1;
      monthData[monthIndex].count = count;
    });

    const totalPresensi = monthData.reduce((acc, cur) => acc + cur.count, 0);

    res.json({
      year,
      total: totalPresensi,
      logsPerMonth: monthData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLogsPerMonth = (req, res) => getLogsPerYear(req, res, new Date().getFullYear());
export const getLogsLastYear = (req, res) => getLogsPerYear(req, res, new Date().getFullYear() - 1);

export const getLogsCurrentMonth = async (req, res) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // JS month starts at 0

    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, now.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10); // Akhir bulan

    const logs = await Presence.find({
      date: { $gte: startDate, $lte: endDate },
    });

    const [membaca, meminjam, lainnya] = await Promise.all([
      Presence.countDocuments({ date: { $gte: startDate, $lte: endDate }, reason: "Membaca" }),
      Presence.countDocuments({ date: { $gte: startDate, $lte: endDate }, reason: "Meminjam" }),
      Presence.countDocuments({ date: { $gte: startDate, $lte: endDate }, reason: "Lainnya" }),
    ]);

    res.json({
      month,
      year,
      count: logs.length,
      membaca,
      meminjam,
      lainnya,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPresenceSummary = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");

    const daily = {
      membaca: await Presence.countDocuments({
        date: today,
        reason: "Membaca",
      }),
      meminjam: await Presence.countDocuments({
        date: today,
        reason: "Meminjam",
      }),
      lainnya: await Presence.countDocuments({
        date: today,
        reason: "Lainnya",
      }),
    };

    const monthly = {
      membaca: await Presence.countDocuments({
        date: { $regex: `^${year}-${month}` },
        reason: "Membaca",
      }),
      meminjam: await Presence.countDocuments({
        date: { $regex: `^${year}-${month}` },
        reason: "Meminjam",
      }),
      lainnya: await Presence.countDocuments({
        date: { $regex: `^${year}-${month}` },
        reason: "Lainnya",
      }),
    };

    const yearly = {
      membaca: await Presence.countDocuments({
        date: { $regex: `^${year}-` },
        reason: "Membaca",
      }),
      meminjam: await Presence.countDocuments({
        date: { $regex: `^${year}-` },
        reason: "Meminjam",
      }),
      lainnya: await Presence.countDocuments({
        date: { $regex: `^${year}-` },
        reason: "Lainnya",
      }),
    };

    res.json({ daily, monthly, yearly });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLogsByReason = async (req, res, reason) => {
  try {
    const logs = await Presence.find({ reason });
    const count = logs.length;

    res.json({ count, data: logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeminjam = (req, res) => getLogsByReason(req, res, "Meminjam");
export const getMembaca = (req, res) => getLogsByReason(req, res, "Membaca");
export const getLainnya = (req, res) => getLogsByReason(req, res, "Lainnya");

export const getAverageTotalLogsPerMonth = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    const logsPerMonth = await Presence.aggregate([
      { $match: { date: { $regex: `^${year}-` } } },
      {
        $group: {
          _id: { month: { $substr: ["$date", 5, 2] } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const monthData = Array.from({ length: 12 }, (_, i) => {
      const daysInMonth = new Date(year, i + 1, 0).getDate();
      return {
        month: String(i + 1).padStart(2, "0"),
        rataRata: 0,
        daysInMonth,
      };
    });

    logsPerMonth.forEach(({ _id, count }) => {
      const monthIndex = parseInt(_id.month, 10) - 1;
      monthData[monthIndex].rataRata = Math.round(
        count / monthData[monthIndex].daysInMonth
      );
    });

    const totalPresensi = logsPerMonth.reduce((acc, cur) => acc + cur.count, 0);
    const [membaca, meminjam, lainnya] = await getPresenceCounts();

    res.json({
      year,
      totalPresensi,
      membaca,
      meminjam,
      lainnya,
      logsPerMonth: monthData.map(({ month, rataRata }) => ({
        month,
        rataRata,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePresence = async (req, res) => {
  try {
    const presence = await Presence.findById(req.params.id);
    if (!presence) {
      return res.status(404).json({ message: "Data presensi tidak ditemukan" });
    }

    if (req.user.nisn !== presence.nisn && req.user.role !== "admin") {
      return res.status(403).json({ message: "Tidak memiliki akses untuk mengedit data ini" });
    }

    const updated = await Presence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Presensi berhasil diperbarui", data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePresence = async (req, res) => {
  try {
    const presence = await Presence.findById(req.params.id);
    if (!presence) {
      return res.status(404).json({ message: "Data presensi tidak ditemukan" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Tidak memiliki akses untuk menghapus data ini" });
    }

    await Presence.findByIdAndDelete(req.params.id);
    res.json({ message: "Presensi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPresenceById = async (req, res) => {
  try {
    const { id } = req.params;

    const presence = await Presence.findById(id);

    if (!presence) {
      return res.status(404).json({ message: "Data presensi tidak ditemukan" });
    }

    const user = await User.findOne({ nisn: presence.nisn }).populate("idMajor");

    res.json({
      id: presence._id,
      nisn: presence.nisn,
      fullName: user?.fullName || "-",
      grade: user?.grade || "-",
      major: user?.idMajor?.major_name || "-",
      date: presence.date,
      time: presence.time,
      reason: presence.reason,
      detailReason: presence.detailReason || "-",
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil data presensi", error: error.message });
  }
};

export const getMostAbsentMajors = async (req, res) => {
  try {
    const result = await Presence.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "nisn",
          foreignField: "nisn",
          as: "userData",
        },
      },
      { $unwind: "$userData" },
      {
        $lookup: {
          from: "majors",
          localField: "userData.idMajor",
          foreignField: "_id",
          as: "majorData",
        },
      },
      { $unwind: "$majorData" },
      {
        $group: {
          _id: "$majorData.major_name",
          totalAbsen: { $sum: 1 },
        },
      },
      { $sort: { totalAbsen: -1 } },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getMostAbsentMajors:", error);
    res.status(500).json({ message: "Gagal mengambil data absen per jurusan" });
  }
};

export const getMostAbsentStudents = async (req, res) => {
  try {
    const result = await Presence.aggregate([
      {
        $group: {
          _id: "$nisn",
          totalAbsen: { $sum: 1 },
          totalMembaca: {
            $sum: { $cond: [{ $eq: ["$reason", "Membaca"] }, 1, 0] },
          },
          totalMeminjam: {
            $sum: { $cond: [{ $eq: ["$reason", "Meminjam"] }, 1, 0] },
          },
          totalLainnya: {
            $sum: { $cond: [{ $eq: ["$reason", "Lainnya"] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "nisn",
          as: "userData",
        },
      },
      {
        $match: {
          userData: { $ne: [] }
        }
      },
      { $unwind: "$userData" },
      {
        $lookup: {
          from: "majors",
          localField: "userData.idMajor",
          foreignField: "_id",
          as: "majorData",
        },
      },
      { $unwind: "$majorData" },
      {
        $project: {
          nisn: "$_id",
          nama: "$userData.fullName",
          kelas: "$userData.grade",
          jurusan: "$majorData.major_name",
          totalAbsen: 1,
          totalMembaca: 1,
          totalMeminjam: 1,
          totalLainnya: 1,
        },
      },
      { $sort: { totalAbsen: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getMostAbsentStudents:", error);
    res.status(500).json({ message: "Gagal mengambil data siswa terbanyak absen" });
  }
};
