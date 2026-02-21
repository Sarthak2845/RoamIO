import  express  from "express";
import {ChatWithAgent} from "../controllers/chatControllers.js";
const router = express.Router();
router.post("/chat",ChatWithAgent);
export default router;