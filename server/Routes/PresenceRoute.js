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
router.get("/summary",getPresenceSummary);
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
  "/summaryMajor",
  authenticateUser,
  authorizeAdmin,
  getPresenceSummaryByMajor
);

router.get("/getToday", authenticateUser, authorizeAdmin, getLogsToday);
router.get(
  "/allUsersPresence",
  authenticateUser,
  authorizeAdmin,
  getAllUsersPresence
);
router.get("/:id", authenticateUser, authorizeAdmin, getPresenceById);
router.put(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  authenticateUser,
  authorizeAdmin,
  updatePresence
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  authenticateUser,
  authorizeAdmin,
  deletePresence
);

export default router;
