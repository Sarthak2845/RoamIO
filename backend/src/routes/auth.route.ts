import  express  from "express";
import { RegisterUser, LoginUser, LogoutUser } from "../controllers/authControllers.js";
const router = express.Router();
router.post("/auth/register", RegisterUser);
router.post("/auth/login", LoginUser);
router.post("/auth/logout", LogoutUser);
export default router;