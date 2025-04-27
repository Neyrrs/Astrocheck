import express from "express";
import { createMajor, getAllMajors, updateMajor, deleteMajor } from "../controllers/MajorController.js";

import { authenticateUser, authorizeAdmin } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

// Route untuk Major
router.post("/", createMajor);      // ➔ Admin buat jurusan baru
router.get("/", authenticateUser, getAllMajors);                     // ➔ Semua user bisa lihat semua jurusan
router.put("/:id", authenticateUser, authorizeAdmin, updateMajor);   // ➔ Admin update jurusan
router.delete("/:id", authenticateUser, authorizeAdmin, deleteMajor);// ➔ Admin hapus jurusan

export default router;
