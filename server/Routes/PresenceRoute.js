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
  getAverageTotalLogsPerMonth,
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
router.get("/getLastYear", authenticateUser, authorizeAdmin, getLogsLastYear);
router.get("/getPerMonth", authenticateUser, authorizeAdmin, getLogsPerMonth);
router.get("/getToday", authenticateUser, authorizeAdmin, getLogsToday);
router.get(
  "/allUsersPresence",
  authenticateUser,
  authorizeAdmin,
  getAllUsersPresence
);
router.get("/avaragePresence", authenticateUser, authorizeAdmin);
router.put("/:id", authenticateUser, authorizeAdmin, updatePresence);
router.delete("/:id", authenticateUser, authorizeAdmin, deletePresence);

export default router;
