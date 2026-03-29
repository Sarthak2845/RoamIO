import axios from "axios";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import logger from "../utils/logger.js";

const hotelsInput = z.object({
    city: z.string().describe("City or destination name to search hotels in"),
    checkIn: z.string().describe("Check-in date in YYYY-MM-DD format e.g. 2024-12-01"),
    checkOut: z.string().describe("Check-out date in YYYY-MM-DD format e.g. 2024-12-07"),
    adults: z.number().optional().default(1).describe("Number of adults. Defaults to 1"),
    children: z.number().optional().default(0).describe("Number of children. Defaults to 0"),
    currency: z.string().optional().default("INR").describe("Currency code. Defaults to INR"),
});

const hotelsInputSchema = z.object({
    params: hotelsInput,
});

export const getHotels = tool(
    async ({ params }) => {
        const { city, checkIn, checkOut, adults, children, currency } = params;

        logger.info("Fetching hotel data", { city, checkIn, checkOut, adults, children });

        const apiKey = process.env.SERP_API_KEY;

        try {
            const searchParams: Record<string, any> = {
                    engine: "google_hotels",
                    q: city,
                    check_in_date: checkIn,
                    check_out_date: checkOut,
                    adults: adults ?? 1,
                    currency: currency ?? "INR",
                    api_key: apiKey,
                };

                if (children) searchParams.children = children;

            const response = await axios.get("https://serpapi.com/search.json", { params: searchParams });

            const hotels = response.data.properties?.slice(0, 5) || [];

            if (!hotels.length) {
                logger.warn("No hotels found", { city });
                return [];
            }

            const results = hotels.map((h: any) => ({
                name: h.name || null,
                rating: h.overall_rating ?? null,
                reviews: h.reviews ?? null,
                price: h.rate_per_night?.lowest ? `₹${h.rate_per_night.lowest}` : null,
                location: h.address || null,
                amenities: h.amenities?.slice(0, 5) || [],
                image: h.images?.[0]?.thumbnail || null,
                link: h.link || null,
            }));

            logger.info("Hotels fetched successfully", { city, count: results.length });
            return results;

        } catch (error: any) {
            logger.error("Failed to fetch hotels", {
                city,
                status: error.response?.status,
                data: error.response?.data,
                error: error.message,
            });
            return [];
        }
    },
    {
        name: "getHotels",
        description: "Find top hotels in a city for given dates. Returns name, price per night, rating, reviews, amenities, location and image.",
        schema: hotelsInputSchema,
    }
);
