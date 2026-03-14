import type { Response, Request } from "express";
import UserPreference from "../models/UserPrefrance.models.js";
import logger from "../utils/logger.js";

export const SetPreference = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const { foodPreference, placeTypes, explorationInterests, transportPreference } = req.body;

        logger.info('Setting preferences for user', { userId });

        const updated = await UserPreference.findOneAndUpdate(
            { userId },
            { foodPreference, placeTypes, explorationInterests, transportPreference },
            { new: true, upsert: true }
        );

        logger.info('Preferences saved successfully', { userId });
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie('hasPreferences', 'true', {
            httpOnly: false,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ success: true, message: "Preferences saved", preferences: updated });

    } catch (error) {
        logger.error('Error setting preferences', { error });
        res.status(500).json({ success: false, error: "Failed to save preferences" });
    }
};

export const GetPreference = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        logger.info('Fetching preferences for user', { userId });

        const preferences = await UserPreference.findOne({ userId });

        if (!preferences) {
            return res.status(404).json({ success: false, error: "No preferences found" });
        }

        logger.info('Preferences fetched successfully', { userId });
        res.status(200).json({ success: true, preferences });

    } catch (error) {
        logger.error('Error fetching preferences', { error });
        res.status(500).json({ success: false, error: "Failed to fetch preferences" });
    }
};
