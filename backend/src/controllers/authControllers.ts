import type { Response, Request } from "express"
import logger from "../utils/logger.js"
import User from "../models/Users.models.js"
import UserPreference from "../models/UserPrefrance.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        logger.info('Received registration request', { email });
        if (!name || !email || !password) {
            logger.warn('Missing fields in registration request');
            return res.status(400).json({ error: "Name, email, and password are required", success: false });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn('Email already registered', { email });
            return res.status(400).json({ error: "Email is already registered", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        logger.info('User registered successfully', { email });
        res.json({ message: "User registered successfully", success: true });
    } catch (error: String | any) {
        logger.error("Error registering user", error.message);
        res.status(500).send({ success: false, message: "Error registering user" });
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body || {};
        logger.info('Received login request', { email });

        if (!email || !password) {
            logger.warn('Missing fields in login request');
            return res.status(400).send({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            logger.warn('User not found during login', { email });
            return res.status(400).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn('Invalid password during login', { email });
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        const isProd = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            httpOnly: true,
            secure: isProd,
            sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
            maxAge: 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);

        const hasPreferences = await UserPreference.exists({ userId: user._id });
        res.cookie('hasPreferences', hasPreferences ? 'true' : 'false', { ...cookieOptions, httpOnly: false });

        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        logger.error("Error logging in user", error);
        res.status(500).send({ success: false, message: "Error logging in user" });
    }
}

export const LogoutUser = (req: Request, res: Response) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        logger.info('User logged out');
        res.send({ success: true, message: "User logged out successfully" });
    } catch (error) {
        logger.error("Error logging out user", error);
        res.status(500).send({ success: false, message: "Error logging out user" });
    }
}
