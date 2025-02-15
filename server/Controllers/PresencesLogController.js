import logSchema from "../Models/PresencesLogSchema.js";

export const getLogs = async (req, res) => {
  try {
    const log = await logSchema.find();
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeminjam = async (req, res) => {
  try {
    const log = await logSchema.find({ alasan: "Meminjam" });
    console.log(log.length);
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMembaca = async (req, res) => {
  try {
    const log = await logSchema.find({ alasan: "Membaca" });
    console.log(log.length);
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLainnya = async (req, res) => {
  try {
    const log = await logSchema.find({ alasan: "Lainnya" });
    console.log(log.length);
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLogsToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const logs = await logSchema.find({
      date: { $gte: today },
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLogsPerMonth = async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();

    const logsPerMonth = new Array(12).fill(0);

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59);

      const count = await logSchema.countDocuments({
        date: { $gte: startDate, $lte: endDate },
      });

      logsPerMonth[month] = count;
    }

    res.json({ year, logsPerMonth });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLogsLastYear = async (req, res) => {
  try {
    const today = new Date();
    const lastYear = today.getFullYear() - 1; 

    const logsPerMonth = new Array(12).fill(0);

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(lastYear, month, 1);
      const endDate = new Date(lastYear, month + 1, 0, 23, 59, 59);

      const count = await logSchema.countDocuments({
        date: { $gte: startDate, $lte: endDate },
      });

      logsPerMonth[month] = count;
    }

    res.json({ year: lastYear, logsPerMonth });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
