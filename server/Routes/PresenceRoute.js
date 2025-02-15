import express from 'express';
import {savePresence, getLogs, getMeminjam, getMembaca, getLainnya, getLogsLastYear, getLogsPerMonth, getLogsToday} from '../Controllers/PresenceController.js';


const router = express.Router();

router.post('/Presence', savePresence);
router.get("/Presence/logKehadiran", getLogs)
router.get("/Presence/logMeminjam", getMeminjam)
router.get("/Presence/logMembaca", getMembaca)
router.get("/Presence/logLainnya", getLainnya)
router.get("/Presence/getLastYear", getLogsLastYear)
router.get("/Presence/getPerMonth", getLogsPerMonth)
router.get("/Presence/getToday", getLogsToday)

export default router;