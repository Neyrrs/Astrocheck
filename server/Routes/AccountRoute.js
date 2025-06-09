import express from "express";
import { registerUser, loginUser, getUserProfile, updateProfile, getAllUsers, deleteUser, geMostStreakUsers} from "../Controllers/AccountController.js";

import { authenticateUser, authorizeAdmin } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getUserProfile);
router.get("/profiles/mostStreak", authenticateUser, authorizeAdmin, geMostStreakUsers);
router.put("/:id", authenticateUser, updateProfile);
router.get("/profiles", authenticateUser, authorizeAdmin, getAllUsers);
router.delete("/:id", authenticateUser, authorizeAdmin, deleteUser);

export default router;
