import type { Request, Response } from "express";
import User from "../models/Users.models.js";
import logger from "../utils/logger.js";

export const setPreferences = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const { travelStyle, preferredClimates, preferredActivities, budgetRange, preferredDestinations } = req.body;

        logger.info('Setting preferences for user', { userId });

        const user = await User.findByIdAndUpdate(
            userId,
            {
                preferences: {
                    travelStyle,
                    preferredClimates,
                    preferredActivities,
                    budgetRange,
                    preferredDestinations
                }
            },
            { new: true, select: '-password' }
        );

        if (!user) {
            logger.warn('User not found while setting preferences', { userId });
            return res.status(404).json({ success: false, error: "User not found" });
        }

        logger.info('Preferences updated successfully', { userId });
        res.status(200).json({ success: true, message: "Preferences updated", preferences: user.preferences });

    } catch (error) {
        logger.error('Error setting preferences', { error });
        res.status(500).json({ success: false, error: "Failed to update preferences" });
    }
};

export const getPreferences = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        logger.info('Fetching preferences for user', { userId });

        const user = await User.findById(userId).select('preferences');

        if (!user) {
            logger.warn('User not found while fetching preferences', { userId });
            return res.status(404).json({ success: false, error: "User not found" });
        }

        logger.info('Preferences fetched successfully', { userId });
        res.status(200).json({ success: true, preferences: user.preferences });

    } catch (error) {
        logger.error('Error fetching preferences', { error });
        res.status(500).json({ success: false, error: "Failed to fetch preferences" });
    }
};
