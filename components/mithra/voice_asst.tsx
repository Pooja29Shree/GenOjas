"use client";

import { useState, useRef } from "react";

export default function VoiceAssistant() {
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", blob);

      const res = await fetch("/api/voice/process", { method: "POST", body: formData });
      const data = await res.json();
      setTranscript(data.transcript);
      setReply(data.reply);
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Talk to Mithra</h2>
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        🎤 Hold to Speak
      </button>

      <div className="mt-4">
        <p><strong>You:</strong> {transcript}</p>
        <p><strong>Mithra:</strong> {reply}</p>
      </div>
    </div>
  );
}
