import express from "express";
import { SetPreference, GetPreference } from "../controllers/prefranceControllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, GetPreference);
router.post("/", authMiddleware, SetPreference);

export default router;
