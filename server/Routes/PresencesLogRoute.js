import express from "express";
import { getLogs, getMeminjam, getMembaca, getLainnya } from "../Controllers/PresencesLogController.js";

const router = express.Router();

router.get("/logKehadiran", getLogs)
router.get("/logMeminjam", getMeminjam)
router.get("/logMembaca", getMembaca)
router.get("/logMembaca", getLainnya)

export default router;