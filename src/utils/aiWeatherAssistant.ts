import OpenAI from "openai";
import { WeatherAppProps } from "../types/weather";
import { buildUserPrompt, SYSTEM_PROMPT } from "./promptTemplate";

const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // override to OpenRouter
  dangerouslyAllowBrowser: true, // for learning / demo
});

export const askWeatherAI = async (
  query: string,
  weatherData: WeatherAppProps,
  history: {
    id: number;
    message: { role: "user" | "assistant"; content: string }[];
  }[] = []
) => {
  try {
    const response = await client.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free", // choose your free model
      messages: [
        { role: "system", content: SYSTEM_PROMPT, ...history.slice(-4) },
        {
          role: "user",
          content: buildUserPrompt(query, weatherData, history),
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn’t process that right now.";
  }
};
