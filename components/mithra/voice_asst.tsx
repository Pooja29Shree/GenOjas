"use client";
import { useState, useRef, useEffect } from "react";
import { Mic, Loader2 } from "lucide-react";

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<
    { role: "user" | "mithra"; text: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  // Keep a reference to the current audio so it won't get garbage collected
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up old audio URLs when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        URL.revokeObjectURL(audioRef.current.src);
        audioRef.current.pause();
      }
    };
  }, []);

  const playAudio = (base64Audio: string) => {
    const audioBlob = new Blob(
      [Uint8Array.from(atob(base64Audio), (c) => c.charCodeAt(0))],
      { type: "audio/mp3" }
    );
    const url = URL.createObjectURL(audioBlob);

    // Stop previous audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
    }

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.play().catch((err) => console.error("Audio play error:", err));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/voice/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText }),
      });

      const data = await res.json();

      // Add Mithra's reply
      setMessages((prev) => [...prev, { role: "mithra", text: data.reply }]);

      // Play Mithra's voice safely
      if (data.audioContent) playAudio(data.audioContent);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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

      {/* Input + Send */}
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-110 active:scale-95`}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
