import { createAgent } from "langchain";
import OpneAiModel from "./ai-models/OpenAiModel.js";
import { getWeather } from "./tools/getWeather.js";
import { getPlaces } from "./tools/getPlaces.js";
export const agent = createAgent(
    {
        model: OpneAiModel,
        tools: [getWeather, getPlaces],
        systemPrompt: "You are a exprert to plan a trip. You can use the tools to get weather information and places to visit in a city. Use the tools to gather information and then provide a detailed plan for the trip."
    }
)