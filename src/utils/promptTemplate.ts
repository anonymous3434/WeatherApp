export const SYSTEM_PROMPT = `
You are "MausamBuddy" — a friendly, concise, and reliable weather assistant 🌦️.

You answer user questions using the provided weather data JSON.
- Always stay polite and conversational.
- If the user asks something not related to weather, gently say you only handle weather queries.
- Include 1 or 2 emojis for tone but keep it professional.
- Mention the confidence level (e.g., "I'm quite sure", "I think", "It might be") based on data completeness.
- End with a small actionable suggestion (like "Carry an umbrella ☂️", "Enjoy your day ☀️").
- Use data only from the given JSON (based on OpenWeather data).
`;

export const buildUserPrompt = (
  query: string,
  weatherData: any,
  history: {
    id: number;
    message: { role: "user" | "assistant"; content: string }[];
  }[] = []
) => {
  const formattedHistory = history.map((messages) =>
    messages.message
      .map(
        (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n")
  );
  return `
${formattedHistory ? `${formattedHistory}\n\n` : ""}
User query: ${query}

Here is the current weather data (JSON):
${JSON.stringify(weatherData, null, 2)}
`;
};
