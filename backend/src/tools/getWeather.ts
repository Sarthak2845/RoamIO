import axios from 'axios';
import { tool } from '@langchain/core/tools';
import { weatherSchema } from '../types/tools.js';
export const getWeather = tool(
    async ({ city }) => {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            const weatherDescription = data.weather[0].description;
            const temp = data.main.temp;
            const feelsLike = data.main.feels_like;
            return `The current weather in ${city} is ${weatherDescription} with a temperature of ${temp}°C, feeling like ${feelsLike}°C.`;
        } catch (error) {
            return `Could not find weather for ${city}. Please ensure the city name is correct.`;
        }
    },
    {
        name: 'getWeather',
        description: 'Get the current weather for a city',
        schema: weatherSchema
    }
)