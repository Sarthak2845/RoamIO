import type { Response, Request } from "express";
import { HumanMessage, SystemMessage } from "langchain";
import logger from "../utils/logger.js";
import UserPreference from "../models/UserPrefrance.models.js";
import OpneAiModel from "../ai-models/OpenAiModel.js";
import { getWeather } from "../tools/getWeather.js";
import { getPlaces } from "../tools/getPlaces.js";
import { getFlights } from "../tools/getFlights.js";
import { getHotels } from "../tools/getHotels.js";

export const ChatWithAgent = async (req: Request, res: Response) => {
    try {
        const { startCity, destination, dateFrom, dateTo, people, budget, userId } = req.body;

        logger.info("Received trip planning request", { startCity, destination, dateFrom, dateTo, people, budget });

        if (!startCity || !destination || !dateFrom || !dateTo) {
            logger.warn("Missing required trip fields");
            return res.status(400).json({ error: "startCity, destination, dateFrom and dateTo are required", success: false });
        }

        const prefs = await UserPreference.findOne({ userId }).lean();
        logger.info("User preferences loaded", { userId, prefs: prefs ? "found" : "not found" });

        // IATA code map for common Indian cities
        const iataMap: Record<string, string> = {
            mumbai: "BOM", delhi: "DEL", bangalore: "BLR", bengaluru: "BLR",
            hyderabad: "HYD", chennai: "MAA", kolkata: "CCU", pune: "PNQ",
            ahmedabad: "AMD", goa: "GOI", jaipur: "JAI", lucknow: "LKO",
            kochi: "COK", surat: "STV", nagpur: "NAG", indore: "IDR",
            bhopal: "BHO", patna: "PAT", chandigarh: "IXC", guwahati: "GAU",
        };

        const toIATA = (city: string) => iataMap[city.toLowerCase()] ?? city.toUpperCase().slice(0, 3);

        // Call all tools in parallel
        logger.info("Calling all tools in parallel");
        const [flightsRaw, hotelsRaw, placesRaw, weatherRaw] = await Promise.allSettled([
            getFlights.invoke({
                params: {
                    departure_airport: toIATA(startCity),
                    arrival_airport: toIATA(destination),
                    outbound_date: dateFrom,
                    return_date: dateTo,
                    adults: Number(people) || 1,
                }
            }),
            getHotels.invoke({
                params: {
                    city: destination,
                    checkIn: dateFrom,
                    checkOut: dateTo,
                    adults: Number(people) || 1,
                    currency: "INR",
                }
            }),
            getPlaces.invoke({ city: destination }),
            getWeather.invoke({ city: destination }),
        ]);

        const flights = flightsRaw.status === "fulfilled" ? flightsRaw.value : [];
        const hotels = hotelsRaw.status === "fulfilled" ? hotelsRaw.value : [];
        const places = placesRaw.status === "fulfilled" ? placesRaw.value : [];
        const weather = weatherRaw.status === "fulfilled" ? weatherRaw.value : null;

        logger.info("All tools completed", {
            flights: Array.isArray(flights) ? flights.length : 0,
            hotels: Array.isArray(hotels) ? hotels.length : 0,
            places: Array.isArray(places) ? places.length : 0,
            weather: !!weather,
        });

        const prefsText = prefs ? `
User Preferences:
- Food: ${prefs.foodPreference}
- Place types: ${prefs.placeTypes?.join(", ")}
- Interests: ${prefs.explorationInterests?.join(", ")}
- Transport: ${prefs.transportPreference}` : "";

        const systemPrompt = `You are RoamIO, an AI travel planner. You will receive real tool data and must return ONLY a valid JSON object. No markdown, no explanation, no extra text.

OUTPUT FORMAT:
{
  "destination": "",
  "duration": "",
  "summary": "",
  "flights": [{ "airline": "", "flight_number": "", "departure_airport": "", "departure_time": "", "arrival_airport": "", "arrival_time": "", "duration": "", "stops": 0, "price": "", "travel_class": "" }],
  "hotels": [{ "name": "", "price": "", "rating": 0, "reviews": 0, "location": "", "amenities": [], "image": "", "link": "" }],
  "places": [{ "name": "", "rating": 0, "address": "", "image": "" }],
  "weather": { "summary": "", "temperature": "", "advice": "" },
  "itinerary": [{ "day": 1, "title": "", "plan": "", "places": [{ "name": "", "rating": 0, "address": "", "image": "" }], "meals": "" }]
}

RULES:
- Copy flights, hotels, places EXACTLY from the tool data provided — do not modify or omit any fields
- weather must be parsed from the weather string provided
- itinerary places must reference objects from the places tool data (copy name, rating, address, image exactly)
- NEVER hallucinate URLs, images, prices or ratings
- If a field is missing from tool data, set it to null`;

        const userMessage = `Plan a trip with these details:
- From: ${startCity} to ${destination}
- Dates: ${dateFrom} to ${dateTo}
- Travellers: ${people || 1}
- Budget: ${budget ? `₹${budget}` : "flexible"}
${prefsText}

Here is the REAL tool data — use it exactly:

FLIGHTS DATA:
${JSON.stringify(flights, null, 2)}

HOTELS DATA:
${JSON.stringify(hotels, null, 2)}

PLACES DATA:
${JSON.stringify(places, null, 2)}

WEATHER DATA:
${JSON.stringify(weather, null, 2)}

Now generate the structured JSON response using this exact data.`;

        logger.info("Sending data to model for structuring");
        const response = await OpneAiModel.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(userMessage),
        ]);

        const raw = typeof response.content === "string"
            ? response.content
            : JSON.stringify(response.content);

        const cleaned = raw.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();

        let parsed: any;
        try {
            parsed = JSON.parse(cleaned);
        } catch {
            logger.error("Failed to parse model JSON response", { raw });
            return res.status(500).json({ error: "Model returned invalid JSON", success: false });
        }

        logger.info("Trip plan generated successfully", { destination });
        res.json({ success: true, data: parsed });

    } catch (error) {
        logger.error("Agent error occurred", { error });
        res.status(500).json({ error: "Something went wrong.", success: false });
    }
};
