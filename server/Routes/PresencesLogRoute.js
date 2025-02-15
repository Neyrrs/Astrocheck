import express from "express";
import { getLogs, getMeminjam, getMembaca, getLainnya, getLogsLastYear, getLogsPerMonth, getLogsToday } from "../Controllers/PresencesLogController.js";

const router = express.Router();

router.get("/logKehadiran", getLogs)
router.get("/logMeminjam", getMeminjam)
router.get("/logMembaca", getMembaca)
router.get("/logLainnya", getLainnya)
router.get("/getLastYear", getLogsLastYear)
router.get("/getPerMonth", getLogsPerMonth)
router.get("/getToday", getLogsToday)

export default router;