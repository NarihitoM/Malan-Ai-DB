import { signup,login,googlesignup,googlelogin } from "../controllers/usercontroller.js";
import express from "express";

const router = express.Router();

router.post("/api/login",login);
router.post("/api/signup",signup);
router.post("/api/google-signup",googlesignup);
router.post("/api/google-login",googlelogin);

export default router;