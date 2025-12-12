import React, { useEffect, useState } from "react";
import { WeatherAppProps } from "../../types/weather";
// @ts-ignore
import { askWeatherAI } from "../../utils/aiWeatherAssistant";
import AiWeatherAssistant from "../services/AiWeatherAssistant";
import ChatHistory from "./ChatHistory";
import WeatherDetails from "./WeatherDetails";
import SearchBar from "./SearchBar";
type WeatherMessageProp = {
  id: number;
  message: { role: "user" | "assistant"; content: string }[];
};
type WeatherCardProps = {
  weatherData: WeatherAppProps;
  city: string;
  isLoading: boolean;
  setCity: React.Dispatch<React.SetStateAction<string>>;
};
const Weathercard: React.FC<WeatherCardProps> = ({
  weatherData,
  city,
  isLoading,
  setCity,
}) => {
  const [query, setQuery] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedChat, setSelectedChat] = useState<WeatherMessageProp | null>(
    null
  );
  const [messages, setMessages] = useState<
    { id: number; message: { role: "user" | "assistant"; content: string }[] }[]
  >(() => {
    const saved = localStorage.getItem("chatHistory");
    try {
      return saved ? (JSON.parse(saved) as WeatherMessageProp[]) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);
  const handleAskAI = async () => {
    setLoadingAI(true);
    const userMsg = {
      message: { role: "user" as const, content: query },
    };

    try {
      const answer = (await askWeatherAI(query, weatherData, messages)) || "";
      const assistantMsg = { role: "assistant" as const, content: answer };
      const converstation: { role: "user" | "assistant"; content: string }[] = [
        userMsg.message,
        assistantMsg,
      ];
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, message: converstation },
      ]);
      setAiResponse(answer);
    } finally {
      setLoadingAI(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white p-4">
      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
        {/* Search Bar */}
        <SearchBar city={city} setCity={setCity} />
        {/* Location */}
        <WeatherDetails isLoading={isLoading} weatherData={weatherData} />
        {/* AI Assistant Section */}
        <AiWeatherAssistant
          query={query}
          setQuery={setQuery}
          handleAskAI={handleAskAI}
          loadingAI={loadingAI}
          aiResponse={aiResponse}
        />
        <ChatHistory
          messages={messages}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>

      {/* Footer */}
      <p className="mt-6 text-white/70 text-sm">
        Powered by OpenWeatherMap • v2.1 • © 2025 Asish Sankhyan
      </p>
    </div>
  );
};
export default Weathercard;
