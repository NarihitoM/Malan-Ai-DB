import { signup,login,googlelogin,chat } from "../controllers/usercontroller.js";
import express from "express";

const router = express.Router();

router.post("/api/login",login);
router.post("/api/signup",signup);
router.post("/api/google-login",googlelogin);
router.post("/api/chat",chat);

export default router;