"use client";

import AuroraBackgroundHome from "@/components/home/AuroraBackgroundHome";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- import router
import { questions } from "@/lib/questions";
import Question from "@/components/Question";

export default function Page() {
  const router = useRouter(); // initialize router
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for Intro
  const [answers, setAnswers] = useState<{ [key: number]: boolean[] }>({});

  const handleOptionClick = (optionIndex: number) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      const questionId = questions[currentQuestionIndex].id;

      if (!newAnswers[questionId]) {
        newAnswers[questionId] = Array(
          questions[currentQuestionIndex].options.length
        ).fill(false);
      }

      const newQuestionAnswers = [...newAnswers[questionId]];
      newQuestionAnswers[optionIndex] = !newQuestionAnswers[optionIndex];
      newAnswers[questionId] = newQuestionAnswers;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalAnswers: string[] = [];

      for (const questionId in answers) {
        const question = questions.find((q) => q.id === parseInt(questionId));
        if (question) {
          const selectedOptions = question.options.filter(
            (_, optionIndex) => answers[parseInt(questionId)][optionIndex]
          );
          finalAnswers.push(...selectedOptions);
        }
      }

      console.log(JSON.stringify(finalAnswers, null, 2));

      // Redirect to dashboard
      router.push("/dashboard");
    }
  };

  if (currentQuestionIndex === -1) {
    return (
      <AuroraBackgroundHome>
        <Intro next={() => setCurrentQuestionIndex(0)} />
      </AuroraBackgroundHome>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const optionsChosen = answers[currentQuestion.id] || [];

  return (
    <AuroraBackgroundHome>
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        optionsChosen={optionsChosen}
        onOptionClick={handleOptionClick}
        onNext={handleNext}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    </AuroraBackgroundHome>
  );
}

function Intro(props: { next: () => void }) {
  return (
    <div className="select-none text-center w-screen h-screen gap-5 flex flex-col justify-center items-center overflow-clip">
      <h1 className="text-4xl font-bold font-inter text-blue-950 sm:text-5xl md:text-6xl">
        Hi there!
      </h1>
      <h3 className="text-2xl w-[80%] font-inter text-blue-950 max-sm:text-base">
        Could you answer a few questions to help us get to know you better?
      </h3>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out flex items-center gap-2"
      >
        Begin
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}
