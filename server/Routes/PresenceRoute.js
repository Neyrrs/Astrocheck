import express from "express";
import {
  savePresence,
  getLogs,
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
  getMostAbsentStudents,
  getPresenceSummaryByMajor
} from "../Controllers/PresenceController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/logKehadiran", authenticateUser, getLogs);

router.post("/", authenticateUser, savePresence);
router.get("/getCurrentMonth", getLogsCurrentMonth);
router.get("/getLastYear", getLogsLastYear);
router.get("/getPerMonth", getLogsPerMonth);
router.get("/summary", getPresenceSummary);
router.get("/analytics/majors", getMostAbsentMajors);
router.get("/analytics/students", getMostAbsentStudents);
router.get("/summaryMajor", getPresenceSummaryByMajor);

router.get("/getToday", authenticateUser, authorizeAdmin, getLogsToday);
router.get("/allUsersPresence", getAllUsersPresence);
router.get("/:id", authenticateUser, authorizeAdmin, getPresenceById);
router.put("/:id", authenticateUser, authorizeAdmin, updatePresence);
router.delete("/:id", authenticateUser, authorizeAdmin, deletePresence);

export default router;
