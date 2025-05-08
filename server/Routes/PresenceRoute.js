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
  deletePresence,
  updatePresence,
  getPresenceById,
  getLogsCurrentMonth,
  getPresenceSummary,
  getMostAbsentMajors,
  getMostAbsentStudents
  } from "../Controllers/PresenceController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, savePresence);
router.get("/logKehadiran", authenticateUser, getLogs);

router.get("/logMeminjam", authenticateUser, authorizeAdmin, getMeminjam);
router.get("/logMembaca", authenticateUser, authorizeAdmin, getMembaca);
router.get("/logLainnya", authenticateUser, authorizeAdmin, getLainnya);
router.get("/getLastYear",  getLogsLastYear);
router.get("/getPerMonth", getLogsPerMonth);
router.get("/getCurrentMonth", getLogsCurrentMonth);

router.get("/summary",  getPresenceSummary);
// routes/presenceRoutes.js
router.get('/analytics/majors', getMostAbsentMajors);
router.get('/analytics/students', getMostAbsentStudents);


router.get("/getToday", authenticateUser, authorizeAdmin, getLogsToday);
router.get(
  "/allUsersPresence",
  getAllUsersPresence
);
router.get("/:id", authenticateUser, authorizeAdmin, getPresenceById);
router.get("/avaragePresence", authenticateUser, authorizeAdmin);
router.put("/:id", authenticateUser, authorizeAdmin, updatePresence);
router.delete("/:id", authenticateUser, authorizeAdmin, deletePresence);

export default router;
