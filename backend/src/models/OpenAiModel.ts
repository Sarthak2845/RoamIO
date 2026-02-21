import { ChatOpenAI } from "@langchain/openai";

const OpneAiModel = new ChatOpenAI(
    {
        model: 'openai/gpt-5-mini',
        temperature: 0,
        streaming: true,
        apiKey: process.env.OPENAI_API_KEY,
        configuration: {
            baseURL: 'https://openrouter.ai/api/v1',
            defaultHeaders: {
                'HTTP-Referer': 'http://localhost:5000', 
                'X-Title': 'AI Travel Agent'
            },
        },
    }
);

export default OpneAiModel;