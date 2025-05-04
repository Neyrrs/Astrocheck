import express from "express";
import { createMajor, getAllMajors, updateMajor, deleteMajor } from "../Controllers/MajorController.js";

import { authenticateUser, authorizeAdmin } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/", createMajor);      
router.get("/", authenticateUser, getAllMajors);                     
router.put("/:id", authenticateUser, authorizeAdmin, updateMajor);  
router.delete("/:id", authenticateUser, authorizeAdmin, deleteMajor);

export default router;
