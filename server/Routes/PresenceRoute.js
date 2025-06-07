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
  getPresenceSummaryByMajor,
  getMonthlyPresenceByMajor,
} from "../Controllers/PresenceController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/logKehadiran", authenticateUser, getLogs);
router.post("/", authenticateUser, savePresence);
router.get(
  "/getCurrentMonth",
  authenticateUser,
  authorizeAdmin,
  getLogsCurrentMonth
);
router.get("/getLastYear", authenticateUser, authorizeAdmin, getLogsLastYear);
router.get("/getPerMonth", authenticateUser, authorizeAdmin, getLogsPerMonth);
router.get("/summary", authenticateUser, authorizeAdmin, getPresenceSummary);
router.get(
  "/analytics/majors",
  authenticateUser,
  authorizeAdmin,
  getMostAbsentMajors
);
router.get(
  "/analytics/students",
  authenticateUser,
  authorizeAdmin,
  getMostAbsentStudents
);
router.get(
  "/majorYearly",
  authenticateUser,
  authorizeAdmin,
  getMonthlyPresenceByMajor
);
router.get(
  "/summaryMajor",
  authenticateUser,
  authorizeAdmin,
  getPresenceSummaryByMajor
);

router.get(
  "/allUsersPresence",
  authenticateUser,
  authorizeAdmin,
  getAllUsersPresence
);
router.get("/:id", authenticateUser, authorizeAdmin, getPresenceById);
router.put("/:id", authenticateUser, authorizeAdmin, updatePresence);
router.delete("/:id", authenticateUser, authorizeAdmin, deletePresence);

export default router;
