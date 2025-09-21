"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import clsx from "clsx";

interface QuestionProps {
  question: string;
  options: string[];
  optionsChosen: boolean[];
  onOptionClick: (optionIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function Question({
  question,
  options,
  optionsChosen,
  onOptionClick,
  onNext,
  isLastQuestion,
}: QuestionProps) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        {question}
      </h3>
      <div className="grid grid-cols-2 gap-5">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => onOptionClick(index)}
            className={clsx(
              "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
              {
                "bg-blue-200/50": optionsChosen[index],
                "bg-white/10": !optionsChosen[index],
              }
            )}
          >
            {option}
          </div>
        ))}
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={onNext}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        {isLastQuestion ? "Finish" : "Next"}
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}
