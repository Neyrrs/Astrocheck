import express from "express";
import {
  savePresence,
  getLogs,
  getLogsLastYear,
  getLogsPerMonth,
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
  exportPresenceExcel,
} from "../Controllers/PresenceController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../Middlewares/AuthMiddleware.js";
import { checkLocalIP } from "../Middlewares/LocalIPMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, savePresence);
router.get("/logKehadiran", authenticateUser, getLogs);

router.get(
  "/allUsersPresence",
  authenticateUser,
  authorizeAdmin,
  getAllUsersPresence
);
router.get("/getPerMonth",  getLogsPerMonth);
router.get(
  "/getCurrentMonth",
  authenticateUser,
  authorizeAdmin,
  getLogsCurrentMonth
);
router.get("/getLastYear", authenticateUser, authorizeAdmin, getLogsLastYear);
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
router.get("/summary", authenticateUser, authorizeAdmin, getPresenceSummary);
router.get(
  "/summaryMajor",
  authenticateUser,
  authorizeAdmin,
  getPresenceSummaryByMajor
);

router.post(
  "/export",
  authenticateUser,
  authorizeAdmin,
  exportPresenceExcel
);

router.get("/:id", authenticateUser, authorizeAdmin, getPresenceById);
router.put("/:id", authenticateUser, authorizeAdmin, updatePresence);
router.delete("/:id", authenticateUser, authorizeAdmin, deletePresence);

export default router;