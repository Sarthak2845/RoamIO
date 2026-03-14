import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        logger.warn('Unauthorized access attempt - no token provided');
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.userId = (decoded as { id: string }).id;
        next();
    } catch (error) {
        logger.warn('Unauthorized access attempt - invalid token', { error: (error as Error).message });
        res.status(401).json({ message: "Invalid token" });
    }
}
export default authMiddleware;