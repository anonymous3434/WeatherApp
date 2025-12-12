import React from "react";
type AiWeatherAssistantProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleAskAI: () => Promise<void>;
  loadingAI: boolean;
  aiResponse: string;
};

const AiWeatherAssistant = ({
  query,
  setQuery,
  handleAskAI,
  loadingAI,
  aiResponse,
}: AiWeatherAssistantProps) => {
  return (
    <div className="mt-8 bg-white/10 p-4 rounded-xl w-full max-w-md text-center">
      <h2 className="text-lg font-semibold mb-2">Ask Weather AI 🤖</h2>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something like 'Will it rain tomorrow?'"
          className="flex-1 bg-white/20 rounded-full px-4 py-2 text-white placeholder-white/70 focus:outline-none"
        />
        <button
          onClick={handleAskAI}
          disabled={loadingAI}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-semibold text-white"
        >
          {loadingAI ? "Thinking..." : "Ask"}
        </button>
      </div>

      {aiResponse && (
        <div className="bg-white/20 p-3 rounded-xl text-white/90">
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AiWeatherAssistant;
