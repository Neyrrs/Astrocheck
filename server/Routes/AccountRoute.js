import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/AccountController.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const router = express.Router();    

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", AuthMiddleware, getUserProfile);

export default router;