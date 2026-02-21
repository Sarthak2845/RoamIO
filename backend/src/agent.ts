import { createAgent } from "langchain";
import OpneAiModel from "./models/OpenAiModel.js";
import { getWeather } from "./tools/getWeather.js";

export const agent = createAgent(
    {
        model: OpneAiModel,
        tools: [getWeather],
        systemPrompt: "You are a professional weather forecast teller. Provide accurate weather information and forecasts in a clear, professional manner."
    }
)