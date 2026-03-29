import axios from "axios";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import logger from "../utils/logger.js";

const flightsInput = z.object({
    departure_airport: z.string().describe("Departure airport code (IATA) e.g. BOM, DEL, BLR"),
    arrival_airport: z.string().describe("Arrival airport code (IATA) e.g. GOI, HYD, CCU"),
    outbound_date: z.string().describe("Outbound date in YYYY-MM-DD format e.g. 2024-12-01"),
    return_date: z.string().optional().describe("Return date in YYYY-MM-DD format e.g. 2024-12-07. Omit for one-way"),
    adults: z.number().optional().default(1).describe("Number of adults. Defaults to 1"),
    children: z.number().optional().default(0).describe("Number of children. Defaults to 0"),
    infants_in_seat: z.number().optional().default(0).describe("Number of infants in seat. Defaults to 0"),
    infants_on_lap: z.number().optional().default(0).describe("Number of infants on lap. Defaults to 0"),
});

const flightsInputSchema = z.object({
    params: flightsInput,
});

export const getFlights = tool(
    async ({ params }) => {
        const { departure_airport, arrival_airport, outbound_date, return_date, adults, children, infants_in_seat, infants_on_lap } = params;

        logger.info("Fetching flight data", { departure_airport, arrival_airport, outbound_date, return_date });

        const apiKey = process.env.SERP_API_KEY;

        try {
            const searchParams: Record<string, any> = {
                    engine: "google_flights",
                    hl: "en",
                    gl: "in",
                    departure_id: departure_airport,
                    arrival_id: arrival_airport,
                    outbound_date,
                    currency: "INR",
                    adults: adults ?? 1,
                    api_key: apiKey,
                };

                if (return_date) searchParams.return_date = return_date;
                if (children) searchParams.children = children;
                if (infants_in_seat) searchParams.infants_in_seat = infants_in_seat;
                if (infants_on_lap) searchParams.infants_on_lap = infants_on_lap;

            const response = await axios.get("https://serpapi.com/search.json", { params: searchParams });

            const flights = response.data.best_flights?.slice(0, 5) || [];

            if (!flights.length) {
                logger.warn("No flights found", { departure_airport, arrival_airport });
                return [];
            }

            const results = flights.map((f: any) => {
                const leg = f.flights?.[0];
                return {
                    airline: leg?.airline || null,
                    flight_number: leg?.flight_number || null,
                    departure_airport: leg?.departure_airport?.name || null,
                    departure_time: leg?.departure_airport?.time || null,
                    arrival_airport: leg?.arrival_airport?.name || null,
                    arrival_time: leg?.arrival_airport?.time || null,
                    duration: f.total_duration ? `${f.total_duration} mins` : null,
                    stops: f.flights?.length ? f.flights.length - 1 : 0,
                    price: f.price ? `₹${f.price}` : null,
                    travel_class: leg?.travel_class || null,
                };
            });

            logger.info("Flights fetched successfully", { departure_airport, arrival_airport, count: results.length });
            return results;

        } catch (error: any) {
            logger.error("Failed to fetch flights", {
                departure_airport,
                arrival_airport,
                status: error.response?.status,
                data: error.response?.data,
                error: error.message,
            });
            return [];
        }
    },
    {
        name: "getFlights",
        description: "Find flights between two airports using IATA codes. Returns airline, flight number, departure/arrival times, duration, stops, price and travel class.",
        schema: flightsInputSchema,
    }
);
