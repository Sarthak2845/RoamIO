import { z } from 'zod';

export const weatherSchema = z.object({
    city: z.string().describe('The city name')
});

export type WeatherInput = z.infer<typeof weatherSchema>;
