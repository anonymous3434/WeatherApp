import OpenAI from "openai";
import { WeatherAppProps } from "../types/weather";
import { buildUserPrompt, SYSTEM_PROMPT } from "./promptTemplate";

const client = {
  chat: {
    completions: {
      create: async (data: any) => {
        const res = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
              "HTTP-Referer": window.location.origin, // Required by OpenRouter
              "X-Title": "WeatherApp", // Required by OpenRouter
            },
            body: JSON.stringify(data),
          }
        );

        return res.json();
      },
    },
  },
};

console.log(process.env, "ashu");
type ChatHistoryItem = {
  id: number;
  message: { role: "user" | "assistant"; content: string }[];
};

export const askWeatherAI = async (
  query: string,
  weatherData: WeatherAppProps,
  history: ChatHistoryItem[] = []
) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "WeatherApp",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.2-3b-instruct:free",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.slice(-4).flatMap((h) => h.message),
            {
              role: "user",
              content: buildUserPrompt(query, weatherData, history),
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log(data, "ashu data");
    return data.choices?.[0]?.message?.content || "No response found.";
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn’t process that right now.";
  }
};
