import { signup,login,googlelogin,chat,getchathistory} from "../controllers/usercontroller.js";
import express from "express";

const router = express.Router();

router.post("/api/login",login);
router.post("/api/signup",signup);
router.post("/api/google-login",googlelogin);


router.post("/api/chat",chat);
router.get("/api/chat/:id",getchathistory);  // retrieve information from backend //

export default router;