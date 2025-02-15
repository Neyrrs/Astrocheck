import express from "express";
import { registerUser, loginUser, getUserProfile, updateProfile } from "../controllers/AccountController.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const router = express.Router();    

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", AuthMiddleware, getUserProfile);
router.put("/profile/update", AuthMiddleware, updateProfile);

export default router;