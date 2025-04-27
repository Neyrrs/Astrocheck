import express from "express";
import { registerUser, loginUser, getUserProfile, updateProfile, getAllUsers} from "../controllers/AccountController.js";

import { authenticateUser, authorizeAdmin } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", authenticateUser,loginUser);
router.get("/profile", authenticateUser, getUserProfile);
router.put("/profile/update", authenticateUser, updateProfile);
router.get("/all-users", authenticateUser, authorizeAdmin, getAllUsers);

export default router;
