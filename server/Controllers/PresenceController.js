  import Presence from "../models/PresenceSchema.js";

  export const savePresence = async (req, res) => {
    try {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);
      const formattedTime = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newPresence = new Presence({
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
      const { nisn } = req.params;
      const logs = await Presence.find({ nisn });

      if (!logs.length) {
        return res.status(404).json({ message: "Tidak ada data presensi untuk NISN ini" });
      }

      const count = logs.length;
      const [membaca, meminjam, lainnya] = await getPresenceCounts();

      res.json({ count, membaca, meminjam, lainnya, logs });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getAverageTotalLogsPerMonth = async (req, res) => {
    try {
      const year = new Date().getFullYear();
      const logsPerMonth = await Presence.aggregate([
        { $match: { date: { $regex: `^${year}-` } } },
        { $group: { _id: { month: { $substr: ["$date", 5, 2] } }, count: { $sum: 1 } } },
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
        monthData[monthIndex].rataRata = Math.round(count / monthData[monthIndex].daysInMonth);
      });

      const totalPresensi = logsPerMonth.reduce((acc, cur) => acc + cur.count, 0);
      const [membaca, meminjam, lainnya] = await getPresenceCounts();

      res.json({
        year,
        count: totalPresensi,
        membaca,
        meminjam,
        lainnya,
        logsPerMonth: monthData.map(({ month, rataRata }) => ({ month, rataRata })),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getLogsByReason = async (req, res, reason) => {
    try {
      const logs = await Presence.find({ alasan: reason });
      const count = logs.length;
  
      res.json({ count, data: logs }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getMeminjam = async (req, res) => getLogsByReason(req, res, "Meminjam");
  export const getMembaca = async (req, res) => getLogsByReason(req, res, "Membaca");
  export const getLainnya = async (req, res) => getLogsByReason(req, res, "Lainnya");
  

  export const getLogsToday = async (req, res) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const logs = await Presence.find({ date: today });

      const [membaca, meminjam, lainnya] = await Promise.all([
        Presence.countDocuments({ date: today, alasan: "Membaca" }),
        Presence.countDocuments({ date: today, alasan: "Meminjam" }),
        Presence.countDocuments({ date: today, alasan: "Lainnya" }),
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

  export const getLogsPerMonth = async (req, res) =>
    getLogsPerYear(req, res, new Date().getFullYear());
  export const getLogsLastYear = async (req, res) =>
    getLogsPerYear(req, res, new Date().getFullYear() - 1);

  const getLogsPerYear = async (req, res, year) => {
    try {
      const logsPerMonth = await Presence.aggregate([
        { $match: { date: { $regex: `^${year}-` } } },
        { $group: { _id: { $substr: ["$date", 5, 2] }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]);
  
      const alasanPerBulan = await Presence.aggregate([
        { $match: { date: { $regex: `^${year}-` } } },
        {
          $group: {
            _id: { month: { $substr: ["$date", 5, 2] }, alasan: "$alasan" },
            count: { $sum: 1 },
          },
        },
      ]);
  
      const monthData = Array.from({ length: 12 }, (_, i) => ({
        month: String(i + 1).padStart(2, "0"),
        count: 0,
        membaca: 0,
        meminjam: 0,
        lainnya: 0,
      }));
  
      logsPerMonth.forEach(({ _id, count }) => {
        const monthIndex = parseInt(_id, 10) - 1;
        monthData[monthIndex].count = count;
      });
  
      alasanPerBulan.forEach(({ _id, count }) => {
        const monthIndex = parseInt(_id.month, 10) - 1;
        if (_id.alasan === "Membaca") monthData[monthIndex].membaca = count;
        else if (_id.alasan === "Meminjam") monthData[monthIndex].meminjam = count;
        else monthData[monthIndex].lainnya = count;
      });
  
      const totalPresensi = monthData.reduce((acc, cur) => acc + cur.count, 0);
      const totalMembaca = monthData.reduce((acc, cur) => acc + cur.membaca, 0);
      const totalMeminjam = monthData.reduce((acc, cur) => acc + cur.meminjam, 0);
      const totalLainnya = monthData.reduce((acc, cur) => acc + cur.lainnya, 0);
  
      res.json({
        year,
        count: totalPresensi,
        membaca: totalMembaca,
        meminjam: totalMeminjam,
        lainnya: totalLainnya,
        logsPerMonth: monthData,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const getAllUsersPresence = async (req, res) => {
    try {
      const presence = await Presence.find().sort({ date: -1 });
      const count = presence.length;
      const [membaca, meminjam, lainnya] = await getPresenceCounts();

      res.json({ count, membaca, meminjam, lainnya, presence });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getPresenceCounts = async () => {
    const [membaca, meminjam, lainnya] = await Promise.all([
      Presence.countDocuments({ alasan: "Membaca" }),
      Presence.countDocuments({ alasan: "Meminjam" }),
      Presence.countDocuments({ alasan: "Lainnya" }),
    ]);
    return [membaca, meminjam, lainnya];
  };
