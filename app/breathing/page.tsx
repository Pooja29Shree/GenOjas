"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

function getBreathingTechnique(ojas: number) {
  if (ojas <= 25) {
    return {
      name: "Box Breathing",
      scientific: "Sama Vritti Pranayama (Equal Breath)",
      description: "Follow the cycle mindfully: Inhale → Hold → Exhale → Hold.",

      cycle: ["Inhale", "Hold", "Exhale", "Hold"],
      durations: [4, 4, 4, 4], // seconds
    };
  } else if (ojas <= 50) {
    return {
      name: "4-7-8 Breathing",
      scientific: "Relaxing Breath Technique",
      description: "Inhale 4s → Hold 7s → Exhale 8s. Focus on deep relaxation.",

      cycle: ["Inhale", "Hold", "Exhale"],
      durations: [4, 7, 8],
    };
  } else if (ojas <= 75) {
    return {
      name: "Alternate Nostril Breathing",
      scientific: "Nadi Shodhana Pranayama",
      description:
        "Close one nostril → Inhale → Switch → Exhale. Balance your energy.",

      cycle: ["Inhale Left", "Exhale Right"],
      durations: [5, 5],
    };
  } else {
    return {
      name: "Gratitude Breathing",
      scientific: "Anapanasati + Gratitude Practice",
      description: "Slow, mindful breaths while reflecting on gratitude & joy.",

      cycle: ["Inhale", "Exhale"],
      durations: [6, 6],
    };
  }
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BreathingPage />
    </Suspense>
  );
}

function BreathingPage() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") || 50);
  const technique = getBreathingTechnique(score);

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phase, setPhase] = useState(technique.cycle[0]);

  useEffect(() => {
    let idx = 0;
    const runPhase = () => {
      const currentPhaseIndex = idx % technique.cycle.length;
      setPhase(technique.cycle[currentPhaseIndex]);
      setPhaseIndex(currentPhaseIndex);

      const duration = technique.durations[currentPhaseIndex] * 1000;
      idx++;
      setTimeout(runPhase, duration);
    };
    runPhase();
  }, [technique]);

  // Circle scale for animation
  const getScale = (phaseName: string) => {
    switch (phaseName) {
      case "Inhale":
      case "Inhale Left":
        return 1.5;
      case "Exhale":
      case "Exhale Right":
        return 0.8;
      case "Hold":
        return 1.1;
      default:
        return 1;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
      <Card className="w-full max-w-6xl rounded-4xl shadow-2xl bg-white/95 backdrop-blur-lg border border-blue-200 overflow-hidden flex flex-row">
        {/* Left Side */}
        <div className="w-1/2 p-12 flex flex-col items-center justify-center relative">
          {/* Emoji bounce */}
          <motion.span
            className="text-8xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          ></motion.span>

          {/* Circle with scaling */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase} // triggers re-render on phase change
              className="w-52 h-52 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-2xl flex items-center justify-center text-white text-xl font-bold mb-6"
              initial={{ scale: 1 }}
              animate={{ scale: getScale(phase) }}
              exit={{ scale: 1 }}
              transition={{
                duration: technique.durations[phaseIndex],
                ease: "easeInOut",
              }}
            >
              {phase}
            </motion.div>
          </AnimatePresence>

          <p className="text-gray-800 font-semibold text-lg mt-4">
            Ojas Score:{" "}
            <span className="text-blue-700 font-bold">{score}/100</span>
          </p>
        </div>

        {/* Right Side: Instructions */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            {technique.name}
          </h2>
          <p className="text-blue-700 font-semibold mb-4">
            {technique.scientific}
          </p>
          <p className="text-gray-600 mb-6 italic">{technique.description}</p>

          <ul className="list-decimal list-inside text-gray-700 space-y-3 text-lg">
            {technique.cycle.map((p, i) => (
              <motion.li
                key={i}
                animate={{
                  color: i === phaseIndex ? "#1E40AF" : "#374151",
                  scale: i === phaseIndex ? 1.1 : 1,
                  fontWeight: i === phaseIndex ? 600 : 400,
                }}
                transition={{ duration: 0.3 }}
              >
                {p} for {technique.durations[i]}s
              </motion.li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
