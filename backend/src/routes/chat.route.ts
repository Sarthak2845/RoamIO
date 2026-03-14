import  express  from "express";
import {ChatWithAgent} from "../controllers/chatControllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/chat",authMiddleware,ChatWithAgent);
export default router;