import axios from "axios";
import { tool } from "@langchain/core/tools";
import { placesSchema } from "../types/tools.js";
import logger from "../utils/logger.js";

export const getPlaces = tool(
  async ({ city }) => {
    logger.info("Fetching places data", { city });

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = "https://maps.googleapis.com/maps/api/place/textsearch/json";

    try {
      const response = await axios.get(url, {
        params: {
          query: `tourist attractions in ${city}`,
          key: apiKey,
        },
      });

      if (response.data.status !== "OK") {
        throw new Error(
          response.data.error_message || "Google Places API error"
        );
      }

      const places = response.data.results.slice(0, 5);

      // ✅ Structured JSON for UI
      const formattedPlaces = places.map((place: any) => {
        const photoReference = place.photos?.[0]?.photo_reference;

        return {
          name: place.name,
          rating: place.rating ?? null,
          address: place.formatted_address,
          image: photoReference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${apiKey}`
            : null,
        };
      });

      // ✅ Fixed logger (no more nulls)
      logger.info("Places data fetched successfully", {
        city,
        places: formattedPlaces.map((p) => p.name),
      });

      return formattedPlaces;
    } catch (error: any) {
      logger.error("Failed to fetch places data", {
        city,
        error: error.message,
      });

      // ✅ Always return consistent format
      return [];
    }
  },
  {
    name: "getPlaces",
    description:
      "Get top tourist attractions for a city with name, rating, address, and image",
    schema: placesSchema,
  }
);