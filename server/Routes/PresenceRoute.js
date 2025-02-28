import express from "express";
import {
  savePresence,
  getLogs,
  getMeminjam,
  getMembaca,
  getLainnya,
  getLogsLastYear,
  getLogsPerMonth,
  getLogsToday,
  getAllUsersPresence,
  getAverageTotalLogsPerMonth
} from "../Controllers/PresenceController.js";

const router = express.Router();

router.post("/", savePresence);
router.get("/logKehadiran/:nisn", getLogs);
router.get("/logMeminjam", getMeminjam);
router.get("/logMembaca", getMembaca);
router.get("/logLainnya", getLainnya);
router.get("/getLastYear", getLogsLastYear);
router.get("/getPerMonth", getLogsPerMonth);
router.get("/getToday", getLogsToday);
router.get("/allUsersPresence", getAllUsersPresence);
router.get("/avaragePresence", getAverageTotalLogsPerMonth);

export default router;
