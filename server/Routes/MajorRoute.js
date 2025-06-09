import express from "express";
import { createMajor, getAllMajors, updateMajor, deleteMajor, getMajorById } from "../Controllers/MajorController.js";

import { authenticateUser, authorizeAdmin } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorizeAdmin, createMajor);      
router.get("/", authenticateUser, authorizeAdmin, getAllMajors);                     
router.put("/:id", authenticateUser, authorizeAdmin, updateMajor);  
router.delete("/:id", authenticateUser, authorizeAdmin, deleteMajor);
router.get("/:id", authenticateUser, authorizeAdmin, getMajorById);

export default router;
