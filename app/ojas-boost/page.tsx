"use client";

import AuroraBackgroundHome from "@/components/home/AuroraBackgroundHome";
import { Button } from "@/components/ui/button";

const boostOptions = [
  "Dhyana",
  "Mitra",
  "Akhyana",
  "Chitra",
  "Raga",
  "Laya",
  "Kritaj",
];

export default function OjasBoostPage() {
  return (
    <AuroraBackgroundHome>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-blue-950 dark:text-white mb-12">
          Boost Your Ojas
        </h1>

        {/* Top row: 4 buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 w-full max-w-6xl justify-items-center">
          {boostOptions.slice(0, 4).map((option) => (
            <Button
              key={option}
              className="w-40 h-32 text-2xl font-bold text-white 
                         bg-gradient-to-r from-purple-500 to-blue-500 
                         hover:from-blue-500 hover:to-purple-500
                         shadow-xl rounded-2xl
                         transform transition-transform duration-300 hover:scale-105
                         flex items-center justify-center"
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Bottom row: 3 buttons centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center mb-12">
          {boostOptions.slice(4).map((option) => (
            <Button
              key={option}
              className="w-40 h-32 text-2xl font-bold text-white 
                         bg-gradient-to-r from-purple-500 to-blue-500 
                         hover:from-blue-500 hover:to-purple-500
                         shadow-xl rounded-2xl
                         transform transition-transform duration-300 hover:scale-105
                         flex items-center justify-center"
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Optional: Image or other content can go here */}
      </div>
    </AuroraBackgroundHome>
  );
}
