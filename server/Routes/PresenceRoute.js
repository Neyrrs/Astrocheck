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
router.get("/summary", authenticateUser, authorizeAdmin, getPresenceSummary);
router.get(
  "/allUsersPresence",
  authenticateUser,
  authorizeAdmin,
  getAllUsersPresence
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
router.get(
  "/majorYearly",
  authenticateUser,
  authorizeAdmin,
  getMonthlyPresenceByMajor
);
router.get("/:id", authenticateUser, authorizeAdmin, getPresenceById);
router.put("/:id", authenticateUser, authorizeAdmin, updatePresence);
router.delete("/:id", authenticateUser, authorizeAdmin, deletePresence);
router.get(
  "/analytics/majors",
  authenticateUser,
  authorizeAdmin,
  getMostAbsentMajors
);

// !CAN'T WORK
// router.get("/getPerMonth", authenticateUser, getLogsPerMonth);
router.get(
  "/getCurrentMonth",
  authenticateUser,
  authorizeAdmin,
  getLogsCurrentMonth
);
router.get("/getLastYear", authenticateUser, authorizeAdmin, getLogsLastYear);



router.post("/export", authenticateUser, authorizeAdmin, exportPresenceExcel);



export default router;
