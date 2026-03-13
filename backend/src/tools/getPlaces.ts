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

      const formattedPlaces = places.map((place: any, index: number) => {
        const photoReference = place.photos?.[0]?.photo_reference;

        const photoUrl = photoReference
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${apiKey}`
          : "No photo available";

        return `${index + 1}. ${place.name}
Rating: ${place.rating ?? "N/A"}
Address: ${place.formatted_address}
Photo: ${photoUrl}`;
      });

      logger.info("Places data fetched successfully", {
        city,
        places: places.map((p: any) => { p.name}),
      });

      return `Top tourist attractions in ${city}:\n\n${formattedPlaces.join(
        "\n\n"
      )}`;
    } catch (error) {
      logger.error("Failed to fetch places data", { city, error });

      return `Could not find tourist attractions for ${city}. Please ensure the city name is correct.`;
    }
  },
  {
    name: "getPlaces",
    description: "Get top tourist attractions for a city with ratings and photos",
    schema: placesSchema,
  }
);