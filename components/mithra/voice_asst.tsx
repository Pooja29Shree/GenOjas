"use client";

import { useState, useRef } from "react";
import { Mic, Loader2 } from "lucide-react";

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<
    { role: "user" | "mithra"; text: string }[]
  >([]);
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const handleMicClick = async () => {
    if (!isListening) {
      // 🎤 Start listening
      setIsListening(true);
      audioChunks.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      mediaRecorder.start();
    } else {
      // ⏹ Stop listening
      setIsListening(false);
      mediaRecorderRef.current?.stop();

      mediaRecorderRef.current!.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        // 1️⃣ Send audio to backend
        const res = await fetch("/api/voice/process", { method: "POST", body: formData });
        const data = await res.json();

        // 2️⃣ Add user transcript to chat
        if (data.transcript) {
          setMessages((prev) => [...prev, { role: "user", text: data.transcript }]);
        }

        // 3️⃣ Add Mithra text reply to chat
        if (data.reply) {
          setMessages((prev) => [...prev, { role: "mithra", text: data.reply }]);
        }
      };
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
      </div>

      {/* Mic button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleMicClick}
          className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all ${
            isListening
              ? "bg-red-500 animate-pulse"
              : "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-110 active:scale-95"
          }`}
        >
          {isListening ? (
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
