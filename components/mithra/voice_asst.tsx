"use client";

import React, { useState, useRef } from "react";

export default function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [assistantText, setAssistantText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const handleRecordStart = async () => {
    setIsRecording(true);
    setTranscript("");
    setAssistantText("");
    setEmotion("");
    setAudioSrc(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("Mic access error:", err);
      setIsRecording(false);
    }
  };

  const handleRecordStop = async () => {
    setIsRecording(false);
    setLoading(true);

    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      audioChunks.current = [];

      const formData = new FormData();
      formData.append("audio", audioBlob);

      try {
        const res = await fetch("/api/voice/process", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("API request failed");

        const data = await res.json();
        setTranscript(data.transcript);
        setAssistantText(data.assistant_text);
        setEmotion(data.emotion);

        if (data.tts_audio_base64) {
          setAudioSrc(`data:audio/mp3;base64,${data.tts_audio_base64}`);
        }
      } catch (err) {
        console.error("Processing error:", err);
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-2xl shadow-xl">
      <h1 className="text-xl font-bold mb-4 text-center">
        🎙️ Mithra - Your Voice Friend
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onMouseDown={handleRecordStart}
          onMouseUp={handleRecordStop}
          className={`w-16 h-16 rounded-full ${
            isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"
          } flex items-center justify-center shadow-lg`}
        >
          {isRecording ? "⏺️" : "🎤"}
        </button>
      </div>

      {loading && (
        <p className="text-center animate-pulse text-gray-400">Processing...</p>
      )}

      {transcript && (
        <div className="mb-4">
          <h2 className="font-semibold text-sm text-gray-400">You said:</h2>
          <p className="bg-gray-800 p-3 rounded-lg">{transcript}</p>
        </div>
      )}

      {assistantText && (
        <div className="mb-4">
          <h2 className="font-semibold text-sm text-gray-400">
            Mithra’s reply ({emotion}):
          </h2>
          <p className="bg-blue-800 p-3 rounded-lg animate-pulse">
            {assistantText}
          </p>
        </div>
      )}

      {audioSrc && (
        <audio controls autoPlay className="w-full mt-2">
          <source src={audioSrc} type="audio/mp3" />
        </audio>
      )}
    </div>
  );
}
