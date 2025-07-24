import { supabase } from "../config/Supabase.js";
import * as XLSX from "sheetjs-style";
import {
  getPreviousWorkday,
  isHolidayOrWeekend,
} from "../Utils/HolidayChecker.js";

const getPresenceCounts = async (dateFilter = {}) => {
  try {
    const { data: counts } = await supabase
      .from("table_guest")
      .select("reason", { count: "exact" })
      .in("reason", ["Membaca", "Meminjam", "Lainnya"]);

    const membaca = counts?.filter((c) => c.reason === "Membaca").length || 0;
    const meminjam = counts?.filter((c) => c.reason === "Meminjam").length || 0;
    const lainnya = counts?.filter((c) => c.reason === "Lainnya").length || 0;

    return [membaca, meminjam, lainnya];
  } catch (error) {
    console.error("Error getting counts:", error);
    return [0, 0, 0];
  }
};

export const savePresence = async (req, res) => {
  try {
    const { nis } = req.user;
    const today = new Date().toISOString().slice(0, 10);

    const { data: user, error: userError } = await supabase
      .from("table_user")
      .select("*")
      .eq("nis", nis)
      .single();

    if (!user || userError) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const now = new Date();
    const formattedTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const { data: todayPresences } = await supabase
      .from("table_guest")
      .select("*")
      .eq("nis", nis)
      .eq("date", today);

    let newStreak = user.streak || 0;

    if (
      (!todayPresences || todayPresences.length === 0) &&
      !isHolidayOrWeekend(today)
    ) {
      const { data: lastPresence } = await supabase
        .from("table_guest")
        .select("date")
        .eq("nis", nis)
        .lt("date", today)
        .order("date", { ascending: false })
        .limit(1)
        .single();

      if (lastPresence) {
        const prevWorkday = await getPreviousWorkday(today);
        if (lastPresence.date === prevWorkday) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      await supabase
        .from("table_user")
        .update({ streak: newStreak })
        .eq("nis", nis);
    }

    const { data: newPresence, error } = await supabase
      .from("table_guest")
      .insert([
        {
          nis: user.nis,
          ...req.body,
          date: today,
          time: formattedTime,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    const [membaca, meminjam, lainnya] = await getPresenceCounts();
    const { count } = await supabase
      .from("table_guest")
      .select("*", { count: "exact" });

    res.status(201).json({
      message: "Presensi berhasil disimpan",
      data: newPresence,
      count,
      membaca,
      meminjam,
      lainnya,
      streak: newStreak,
    });
  } catch (error) {
    console.error("Error in savePresence:", error);
    res.status(400).json({
      message: error.message || "Gagal menyimpan data",
    });
  }
};

export const getLogs = async (req, res) => {
  try {
    const { nis } = req.user || "";

    const { data: logs, error: logsError } = await supabase
      .from("table_guest")
      .select("*")
      .eq("nis", nis);

    if (logsError) throw logsError;
    if (!logs.length) {
      return res
        .status(404)
        .json({ message: "Tidak ada data presensi untuk user ini" });
    }

    const { data: user, error: userError } = await supabase
      .from("table_user")
      .select("fullname, grade, id_major:table_major(major_name)")
      .eq("nis", nis)
      .single();

    if (!user || userError) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const formattedLogs = logs.map((log) => ({
      id: log.id,
      fullname: user.fullname,
      grade: user.grade,
      major: user.id_major?.major_name || "-",
      date: log.date,
      time: log.time,
      reason: log.reason,
      detailReason: log.detailReason || "-",
    }));

    const count = logs.length;
    const [membaca, meminjam, lainnya] = await getPresenceCounts();

    const now = new Date();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentYear = String(now.getFullYear());
    const today = now.toISOString().split("T")[0];

    const monthly = logs.filter(
      (log) => log.date?.split("-")[1] === currentMonth
    ).length;
    const yearly = logs.filter(
      (log) => log.date?.split("-")[0] === currentYear
    ).length;

    const logHariIni = logs.find((log) => log.date === today);
    const lastPresence = logHariIni?.time || "-";

    res.json({
      count,
      monthly,
      yearly,
      membaca,
      meminjam,
      lainnya,
      lastPresence,
      logs: formattedLogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsersPresence = async (req, res) => {
  try {
    const { data: presenceList, error: presenceError } = await supabase
      .from("table_guest")
      .select(
        `*, 
        user:table_user(fullname, grade, id_major:table_major(major_name))`
      )
      .order("date", { ascending: false });

    if (presenceError) throw presenceError;

    const count = presenceList.length;
    const [membaca, meminjam, lainnya] = await getPresenceCounts();

    const formattedPresence = presenceList.map((pres) => ({
      id: pres.id_user,
      fullname: pres.user?.fullname || "-",
      grade: pres.user?.grade || "-",
      major: pres.user?.id_major?.major_name || "-",
      date: pres.date,
      time: pres.time,
      reason: pres.reason,
      detailReason: pres.detail_reason || "-",
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

// !BANNED
export const getLogsToday = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const { data: logs, error: logsError } = await supabase
      .from("table_guest")
      .select("*")
      .eq("date", today);

    if (logsError) throw logsError;

    const [membaca, meminjam, lainnya] = await Promise.all([
      supabase
        .from("table_guest")
        .select("*")
        .eq("date", today)
        .eq("reason", "Membaca")
        .count(),
      supabase
        .from("table_guest")
        .select("*")
        .eq("date", today)
        .eq("reason", "Meminjam")
        .count(),
      supabase
        .from("table_guest")
        .select("*")
        .eq("date", today)
        .eq("reason", "Lainnya")
        .count(),
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
    const startDate = `${year}-01-01`;
    const endDate = `${year + 1}-01-01`; // eksklusif

    const { data: logs, error } = await supabase
      .from("table_guest")
      .select("date")
      .gte("date", startDate)
      .lt("date", endDate)
      .order("date", { ascending: true });

    if (error) throw error;

    const monthData = Array.from({ length: 12 }, (_, i) => ({
      month: String(i + 1).padStart(2, "0"),
      count: 0,
    }));

    logs.forEach(({ date }) => {
      const monthIndex = new Date(date).getMonth();
      monthData[monthIndex].count += 1;
    });

    const totalPresensi = monthData.reduce((sum, m) => sum + m.count, 0);

    res.json({
      year,
      total: totalPresensi,
      logsPerMonth: monthData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data presensi per bulan",
      error: error.message,
    });
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
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, now.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10);

    const { data: logs, error: logsError } = await supabase
      .from("table_guest")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate);

    if (logsError) throw logsError;

    const [membaca, meminjam, lainnya] = await Promise.all([
      supabase
        .from("table_guest")
        .select("*")
        .gte("date", startDate)
        .lte("date", endDate)
        .eq("reason", "Membaca")
        .count(),
      supabase
        .from("table_guest")
        .select("*")
        .gte("date", startDate)
        .lte("date", endDate)
        .eq("reason", "Meminjam")
        .count(),
      supabase
        .from("table_guest")
        .select("*")
        .gte("date", startDate)
        .lte("date", endDate)
        .eq("reason", "Lainnya")
        .count(),
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

    const startOfMonth = `${year}-${month}-01`;
    const endOfMonth = new Date(year, parseInt(month), 0)
      .toISOString()
      .slice(0, 10);

    const startOfYear = `${year}-01-01`;
    const endOfYear = `${year}-12-31`;

    const rangeCount = async (start, end, reason = null) => {
      let query = supabase
        .from("table_guest")
        .select("*", { count: "exact", head: true })
        .gte("date", start)
        .lte("date", end);

      if (reason) {
        query = query.eq("reason", reason);
      }

      const { count } = await query;
      return count || 0;
    };

    const daily = {
      membaca: await rangeCount(today, today, "Membaca"),
      meminjam: await rangeCount(today, today, "Meminjam"),
      lainnya: await rangeCount(today, today, "Lainnya"),
      count: await rangeCount(today, today),
    };

    const monthly = {
      membaca: await rangeCount(startOfMonth, endOfMonth, "Membaca"),
      meminjam: await rangeCount(startOfMonth, endOfMonth, "Meminjam"),
      lainnya: await rangeCount(startOfMonth, endOfMonth, "Lainnya"),
      count: await rangeCount(startOfMonth, endOfMonth),
    };

    const yearly = {
      membaca: await rangeCount(startOfYear, endOfYear, "Membaca"),
      meminjam: await rangeCount(startOfYear, endOfYear, "Meminjam"),
      lainnya: await rangeCount(startOfYear, endOfYear, "Lainnya"),
      count: await rangeCount(startOfYear, endOfYear),
    };

    res.status(200).json({ daily, monthly, yearly });
  } catch (error) {
    console.error("Error in getPresenceSummary:", error);
    res.status(500).json({ message: error.message });
  }
};

const getLogsByReason = async (req, res, reason) => {
  try {
    const { data: logs, error: logsError } = await supabase
      .from("table_guest")
      .select("*")
      .eq("reason", reason);

    if (logsError) throw logsError;

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

    const { data: logsPerMonth, error: logsError } = await supabase
      .from("table_guest")
      .select("date")
      .ilike("date", `${year}-%`)
      .group("date")
      .order("date", { ascending: true });

    if (logsError) throw logsError;

    const monthData = Array.from({ length: 12 }, (_, i) => {
      const daysInMonth = new Date(year, i + 1, 0).getDate();
      return {
        month: String(i + 1).padStart(2, 0),
        rataRata: 0,
        daysInMonth,
      };
    });

    logsPerMonth.forEach(({ date }) => {
      const monthIndex = new Date(date).getMonth();
      monthData[monthIndex].rataRata += 1 / monthData[monthIndex].daysInMonth;
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
        rataRata: Math.round(rataRata),
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePresence = async (req, res) => {
  try {
    const { data: presence, error: presenceError } = await supabase
      .from("table_guest")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (presenceError) {
      return res.status(404).json({ message: "Data presensi tidak ditemukan" });
    }

    if (req.user.nis !== presence.nis && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Tidak memiliki akses untuk mengedit data ini" });
    }

    const { data: updated, error: updateError } = await supabase
      .from("table_guest")
      .update(req.body)
      .eq("id", req.params.id)
      .select()
      .single();

    if (updateError) throw updateError;

    res.json({ message: "Presensi berhasil diperbarui", data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePresence = async (req, res) => {
  try {
    const { data: presence, error: presenceError } = await supabase
      .from("table_guest")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (presenceError) {
      return res.status(404).json({ message: "Data presensi tidak ditemukan" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Tidak memiliki akses untuk menghapus data ini" });
    }

    const { error: deleteError } = await supabase
      .from("table_guest")
      .delete()
      .eq("id", req.params.id);

    if (deleteError) throw deleteError;

    res.json({ message: "Presensi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPresenceById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: presence, error: presenceError } = await supabase
      .from("table_guest")
      .select("*")
      .eq("id", id)
      .single();

    if (presenceError) {
      return res.status(404).json({ message: "Data presensi tidak ditemukan" });
    }

    const { data: user, error: userError } = await supabase
      .from("table_user")
      .select("idMajor")
      .eq("nis", presence.nis)
      .single();

    if (userError) throw userError;

    res.json({
      id: presence.id,
      nis: presence.nis,
      fullname: presence.fullname,
      grade: presence.grade,
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
    const { data: result, error } = await supabase
      .from("table_guest")
      .select("nis, count(nis) as totalAbsen")
      .group("nis")
      .order("totalAbsen", { ascending: false });

    if (error) throw error;

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getMostAbsentMajors:", error);
    res.status(500).json({ message: "Gagal mengambil data absen per jurusan" });
  }
};

export const getMostAbsentStudents = async (req, res) => {
  try {
    const { data, error } = await supabase.from("table_guest").select(`
        nis,
        reason,
        table_user:table_user(
          fullname,
          streak,
          grade,
          id_major:table_major(major_name)
        )
      `);

    if (error) throw error;

    const stats = {};

    for (const pres of data) {
      const nis = pres.nis;
      const reason = pres.reason?.toLowerCase();

      if (!stats[nis]) {
        stats[nis] = {
          nis,
          fullname: pres.table_user?.fullname || "-",
          grade: pres.table_user?.grade || "-",
          major: pres.table_user?.id_major?.major_name || "-",
          totalAbsen: 0,
          membaca: 0,
          meminjam: 0,
          lainnya: 0,
        };
      }

      if (["membaca", "meminjam", "lainnya"].includes(reason)) {
        stats[nis][reason]++;
      }

      stats[nis].totalAbsen++;
    }

    const topAbsentArray = Object.values(stats)
      .sort((a, b) => b.totalAbsen - a.totalAbsen)
      .slice(0, 10);

    return res.status(200).json(topAbsentArray);
  } catch (error) {
    console.error("Error in getMostAbsentStudents:", error);
    res.status(500).json({
      message: "Gagal mengambil data siswa dengan absen terbanyak",
      error: error.message,
    });
  }
};

export const getPresenceSummaryByMajor = async (req, res) => {
  try {
    const { data: presences } = await supabase.from("table_guest").select(`
        *,
        table_user:nis(
          table_major:id_major(major_name)
        )
      `);

    const majorStats = presences.reduce((acc, presence) => {
      const majorName = presence.table_user?.table_major?.major_name?.replace(
        /\s*\d+$/,
        ""
      );
      if (!majorName) return acc;

      if (!acc[majorName]) {
        acc[majorName] = {
          major: majorName,
          count: 0,
        };
      }
      acc[majorName].count++;
      return acc;
    }, {});

    const finalResult = Object.values(majorStats);

    res.status(200).json(finalResult);
  } catch (error) {
    console.error("Error while summarizing presence:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMonthlyPresenceByMajor = async (req, res) => {
  try {
    const year = req.query.year
      ? parseInt(req.query.year, 10)
      : new Date().getFullYear();

    const { data: presences, error: presenceError } = await supabase
      .from("table_guest")
      .select(
        `
        *,
        table_user:nis (
          *,
          table_major:id_major (
            major_name
          )
        )
      `
      )
      .gte("date", `${year}-01-01`)
      .lt("date", `${year + 1}-01-01`);

    if (presenceError) throw presenceError;

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
      10: "oktober",
      11: "november",
      12: "desember",
    };

    const resultData = {};
    Object.values(monthNames).forEach((monthName) => {
      resultData[monthName] = {};
    });

    presences.forEach((presence) => {
      const month = presence.date.split("-")[1];
      const monthName = monthNames[month];
      const major = presence.table_user?.table_major?.major_name;
      const reason = presence.reason.toLowerCase();

      if (major && monthName) {
        if (!resultData[monthName][major]) {
          resultData[monthName][major] = {
            count: 0,
            meminjam: 0,
            membaca: 0,
            lainnya: 0,
          };
        }
        resultData[monthName][major].count++;
        resultData[monthName][major][reason]++;
      }
    });

    res.status(200).json({
      year,
      data: resultData,
    });
  } catch (error) {
    console.error("Error in getMonthlyPresenceByMajor:", error);
    res.status(500).json({
      message: "Gagal mengambil data presensi per jurusan per bulan",
      error: error.message,
    });
  }
};

const createExcelBufferFromJSON = (jsonData, sheetName = "Presensi") => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_cell({ r: 0, c: C });
    if (worksheet[address]) {
      worksheet[address].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F46E5" } },
        alignment: { horizontal: "center" },
      };
    }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  return XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
};

export const exportPresenceExcel = async (req, res) => {
  const { jenis } = req.body;

  try {
    let data = [];
    const year = new Date().getFullYear();

    if (jenis === "tahunan") {
      const { data: majors } = await supabase
        .from("table_major")
        .select("major_name");

      const uniqueMajors = [
        ...new Set(
          majors.map((m) => m.major_name.replace(/\s*\d+$/, "").trim())
        ),
      ];

      const { data: presences } = await supabase
        .from("table_guest")
        .select(
          `
          date,
          table_user:nis (
            table_major:id_major (
              major_name
            )
          )
        `
        )
        .ilike("date", `${year}-%`);

      const monthlyData = {};
      presences.forEach((presence) => {
        const month = presence.date.split("-")[1];
        const majorName = presence.table_user?.table_major?.major_name
          ?.replace(/\s*\d+$/, "")
          .trim();

        if (majorName) {
          if (!monthlyData[majorName]) {
            monthlyData[majorName] = {};
          }
          monthlyData[majorName][month] =
            (monthlyData[majorName][month] || 0) + 1;
        }
      });

      data = uniqueMajors.map((majorName) => {
        const row = { Jurusan: majorName };
        bulanMap.forEach((namaBulan, kodeBulan) => {
          row[namaBulan] = monthlyData[majorName]?.[kodeBulan] || 0;
        });
        return row;
      });
    } else if (jenis === "bulanan") {
      const month = String(new Date().getMonth() + 1).padStart(2, "0");

      const { data: presences } = await supabase
        .from("table_guest")
        .select(
          `
          table_user:nis (
            table_major:id_major (
              major_name
            )
          )
        `
        )
        .ilike("date", `${year}-${month}-%`);

      const countMap = {};
      presences.forEach((presence) => {
        const majorName = presence.table_user?.table_major?.major_name
          ?.replace(/\s*\d+$/, "")
          .trim();

        if (majorName) {
          if (!countMap[majorName]) {
            countMap[majorName] = { Jurusan: majorName, Jumlah: 0 };
          }
          countMap[majorName].Jumlah++;
        }
      });

      data = Object.values(countMap);
    }

    const buffer = createExcelBufferFromJSON(data, `Presensi-${jenis}`);
    const filename = `Presensi-${jenis}-${Date.now()}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.send(buffer);
  } catch (error) {
    console.error("Gagal export Excel:", error);
    res.status(500).json({ message: error.message });
  }
};
