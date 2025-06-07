import Presence from "../Models/PresenceSchema.js";
import User from "../Models/AccountSchema.js";
import Major from "../Models/MajorSchema.js";
import { isHolidayOrWeekend } from "../Utils/HolidayChecker.js";

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
    const { nis } = req.user;

    const user = await User.findOne({ nis });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const now = new Date();
    const formattedDate = now
      .toLocaleDateString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
    const formattedTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let newStreak = user.streak;

    if (!isHolidayOrWeekend(formattedDate)) {
      const lastPresence = await Presence.findOne({ nis }).sort({ date: -1 });

      if (lastPresence) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);

        if (lastPresence.date === yesterdayStr) {
          newStreak = user.streak + 1;
        } else {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      user.streak = newStreak;
      await user.save();
    }

    const newPresence = new Presence({
      nis: user.nis,
      status: user.status,
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
      streak: user.streak,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal menyimpan data", error: error.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const { nis } = req.user || "";

    const logs = await Presence.find({ nis });
    if (!logs.length) {
      return res
        .status(404)
        .json({ message: "Tidak ada data presensi untuk user ini" });
    }

    const user = await User.findOne({ nis })
      .select("fullName grade idMajor")
      .populate("idMajor", "major_name");

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
    const presenceList = await Presence.find().sort({ date: -1 });

    const count = presenceList.length;
    const [membaca, meminjam, lainnya] = await getPresenceCounts();

    const formattedPresence = await Promise.all(
      presenceList.map(async (pres) => {
        const user = await User.findOne({ nis: pres.nis }).populate("idMajor");

        return {
          id: pres._id,
          fullName: user?.fullName || "-",
          grade: user?.grade || "-",
          major: user?.idMajor?.major_name || "-",
          date: pres.date,
          time: pres.time,
          reason: pres.reason,
          detailReason: pres.detailReason || "-",
        };
      })
    );

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
      { $sort: { _id: 1 } },
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

export const getLogsPerMonth = (req, res) =>
  getLogsPerYear(req, res, new Date().getFullYear());
export const getLogsLastYear = (req, res) =>
  getLogsPerYear(req, res, new Date().getFullYear() - 1);

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
      Presence.countDocuments({
        date: { $gte: startDate, $lte: endDate },
        reason: "Membaca",
      }),
      Presence.countDocuments({
        date: { $gte: startDate, $lte: endDate },
        reason: "Meminjam",
      }),
      Presence.countDocuments({
        date: { $gte: startDate, $lte: endDate },
        reason: "Lainnya",
      }),
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
      count: await Presence.countDocuments({ date: today }),
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
      count: await Presence.countDocuments({
        date: { $regex: `^${year}-${month}` },
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
      count: await Presence.countDocuments({ date: { $regex: `^${year}-` } }),
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

    if (req.user.nis !== presence.nis && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Tidak memiliki akses untuk mengedit data ini" });
    }

    const updated = await Presence.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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
      return res
        .status(403)
        .json({ message: "Tidak memiliki akses untuk menghapus data ini" });
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

    const user = await User.findOne({ nis: presence.nis }).populate("idMajor");

    res.json({
      id: presence._id,
      nis: presence.nis,
      fullName: user?.fullName || "-",
      grade: user?.grade || "-",
      major: user?.idMajor?.major_name || "-",
      date: presence.date,
      time: presence.time,
      reason: presence.reason,
      detailReason: presence.detailReason || "-",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data presensi",
      error: error.message,
    });
  }
};

export const getMostAbsentMajors = async (req, res) => {
  try {
    const result = await Presence.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "nis",
          foreignField: "nis",
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
          _id: "$nis",
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
          foreignField: "nis",
          as: "userData",
        },
      },
      {
        $match: {
          userData: { $ne: [] },
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
        $project: {
          nis: "$_id",
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
    res
      .status(500)
      .json({ message: "Gagal mengambil data siswa terbanyak absen" });
  }
};

export const getPresenceSummaryByMajor = async (req, res) => {
  try {
    const result = await Major.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "idMajor",
          as: "students",
        },
      },
      {
        $unwind: {
          path: "$students",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "presences",
          localField: "students.nis",
          foreignField: "nis",
          as: "presences",
        },
      },
      {
        $unwind: {
          path: "$presences",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          major: { $first: "$major_name" },
          count: {
            $sum: {
              $cond: [{ $ifNull: ["$presences._id", false] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          major: 1,
          count: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error while summarizing presence:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMonthlyPresenceByMajor = async (req, res) => {
  try {
    const year = req.query.year ? parseInt(req.query.year, 10) : new Date().getFullYear();

    const aggregationResult = await Presence.aggregate([
      {
        $match: { date: { $regex: `^${year}-` } }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'nis',
          foreignField: 'nis',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'majors',
          localField: 'user.idMajor',
          foreignField: '_id',
          as: 'major'
        }
      },
      { $unwind: '$major' },
      {
        $addFields: {
          month: { $substr: ["$date", 5, 2] }
        }
      },
      {
        $group: {
          _id: { month: "$month", major: "$major.major_name", reason: "$reason" },
          count: { $sum: 1 }
        }
      }
    ]);

    const monthNames = {
      "01": "januari",
      "02": "februari",
      "03": "maret",
      "04": "april",
      "05": "mei",
      "06": "juni",
      "07": "juli",
      "08": "agustus",
      "09": "september",
      "10": "oktober",
      "11": "november",
      "12": "desember"
    };

    const resultData = {};

    Object.values(monthNames).forEach(monthName => {
      resultData[monthName] = {};
    });

    aggregationResult.forEach(item => {
      const { month, major, reason } = item._id;
      const count = item.count;
      const monthName = monthNames[month] || month;

      if (!resultData[monthName][major]) {
        resultData[monthName][major] = {
          count: 0,
          meminjam: 0,
          membaca: 0,
          lainnya: 0
        };
      }

      resultData[monthName][major].count += count;

      const reasonKey = reason.toLowerCase();
      if (["meminjam", "membaca", "lainnya"].includes(reasonKey)) {
        resultData[monthName][major][reasonKey] += count;
      }
    });

    res.status(200).json({
      year,
      data: resultData
    });
  } catch (error) {
    console.error("Error in getMonthlyPresenceByMajor:", error);
    res.status(500).json({ message: "Gagal mengambil data presensi per jurusan per bulan", error: error.message });
  }
};
