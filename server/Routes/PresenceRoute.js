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
  
  
} from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/logKehadiran", getLogs);
router.get("/majorYearly", getMonthlyPresenceByMajor)
router.post("/",  savePresence);
router.get(
  "/getCurrentMonth",
  
  
  getLogsCurrentMonth
);
router.get("/getLastYear",   getLogsLastYear);
router.get("/getPerMonth",   getLogsPerMonth);
router.get("/summary",getPresenceSummary);
router.get(
  "/analytics/majors",
  
  
  getMostAbsentMajors
);
router.get(
  "/analytics/students",
  
  
  getMostAbsentStudents
);
router.get(
  "/summaryMajor",
  
  
  getPresenceSummaryByMajor
);

// router.get("/getToday",   getLogsToday);
router.get(
  "/allUsersPresence",
  
  
  getAllUsersPresence
);
router.get("/:id",   getPresenceById);
router.put(
  "/:id",
  
  
  
  
  updatePresence
);
router.delete(
  "/:id",
  
  
  
  
  deletePresence
);

export default router;
