import React from "react";
type ChatHistoryProp = {
  messages: {
    id: number;
    message: { role: "user" | "assistant"; content: string }[];
  }[];
  selectedChat: {
    id: number;
    message: { role: "user" | "assistant"; content: string }[];
  } | null;
  setSelectedChat: React.Dispatch<
    React.SetStateAction<{
      id: number;
      message: { role: "user" | "assistant"; content: string }[];
    } | null>
  >;
};
function ChatHistory({
  messages,
  selectedChat,
  setSelectedChat,
}: ChatHistoryProp) {
  return (
    <>
      <div className="w-full max-w-md space-y-4">
        {messages.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="cursor-pointer p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <p className="text-sm text-gray-700 truncate">
              {chat.message[0].content}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {messages.length} messages
            </p>
          </div>
        ))}
      </div>
      {selectedChat && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg relative">
            <button
              onClick={() => setSelectedChat(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Conversation</h2>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {selectedChat.message.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1">{msg.role}</p>
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatHistory;
