"use client";

import { useState } from "react";
import { Mic, Loader2 } from "lucide-react";

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<
    { role: "user" | "mithra"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Fallback text chat
  const handleSend = async () => {
    if (!input.trim()) return;

    // 1️⃣ Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    const messageToSend = input;
    setInput("");
    setIsTyping(true);

    try {
      // 2️⃣ Send to backend
      const res = await fetch("/api/voice/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: messageToSend }),
      });
      const data = await res.json();

      // 3️⃣ Add Mithra reply
      setMessages((prev) => [...prev, { role: "mithra", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "mithra", text: "Oops, something went wrong 😅" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-2xl h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col p-6">
      <div className="text-center font-bold text-2xl text-pink-300">Mithra</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[80%] ${
              msg.role === "user"
                ? "ml-auto bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                : "mr-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="mr-auto p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white max-w-[80%]">
            Mithra is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type something..."
          className="flex-1 px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-white outline-none placeholder:text-white/50"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white hover:scale-105 transition-transform"
        >
          Send
        </button>
        {/* Mic button for future */}
        <button
          className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all ${
            isListening
              ? "bg-red-500 animate-pulse"
              : "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-110 active:scale-95"
          }`}
        >
          <Mic className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
