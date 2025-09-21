"use client";
import { useState } from "react";
import { Mic, Loader2 } from "lucide-react";

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<{ role: "user" | "mithra"; text: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Simulate recording voice
  const handleMicClick = async () => {
    setIsListening(true);

    // TODO: integrate Google Speech-to-Text API
    setTimeout(() => {
      const userText = "Hey Mithra, how are you today?";
      setMessages((prev) => [...prev, { role: "user", text: userText }]);
      setIsListening(false);
      handleMithraReply(userText);
    }, 2000);
  };

  // Simulate Mithra's reply
  const handleMithraReply = async (userText: string) => {
    setIsSpeaking(true);

    // TODO: call API (/api/voice/process)
    setTimeout(() => {
      const reply = "I’m doing great! Excited to chat with you.";
      setMessages((prev) => [...prev, { role: "mithra", text: reply }]);
      setIsSpeaking(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-2xl h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col p-6">
      {/* Header */}
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

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="mr-auto flex space-x-2 p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white max-w-[40%]">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleMicClick}
          disabled={isListening}
          className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all ${
            isListening
              ? "bg-red-500 animate-pulse"
              : "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-110 active:scale-95"
          }`}
        >
          {isListening ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : <Mic className="w-6 h-6 text-white" />}
        </button>
      </div>
    </div>
  );
}
