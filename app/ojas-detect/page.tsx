"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuroraBackgroundHome from "@/components/home/AuroraBackgroundHome";
import { MoveRight } from "lucide-react";

const quizQuestions = [
	{
		id: 1,
		question: "🌙 Sleep & Rest\n\nHow did you sleep last night?",
		options: [
			"🛌 Slept like a baby in a cloud kingdom",
			"😴 Tossed a bit, like a boat on gentle waves",
			"🌪️ Restless, like a stormy night",
			"🦉 Barely shut my eyes — the night owl won",
		],
	},
	{
		id: 2,
		question: "⚡ Energy\n\nWhat’s your energy right now?",
		options: [
			"🐘 Enough to lift an elephant!",
			"🐎 Can gallop like a horse",
			"🐢 Slow but moving",
			"🪨 Stuck like a rock",
		],
	},
	{
		id: 3,
		question: "🎯 Focus\n\nHow sharp is your focus today?",
		options: [
			"🎯 Hitting bullseyes blindfolded",
			"🔍 I can see the target but need effort",
			"🌫️ Feels like reading through fog",
			"🪁 Mind flying everywhere like a kite",
		],
	},
	{
		id: 4,
		question: "🍲 Appetite\n\nHow’s your appetite?",
		options: [
			"🍱 Could finish a royal thali alone",
			"🥗 Hungry enough for a healthy plate",
			"🍌 Just a small snack will do",
			"🚫 No interest in food today",
		],
	},
	{
		id: 5,
		question: "🤝 Social Connection\n\nHow connected do you feel with people around you?",
		options: [
			"🎉 Dancing at a festival with friends",
			"☕ Chatting over coffee with a buddy",
			"📱 Only exchanging texts here and there",
			"🏝️ Alone on an island",
		],
	},
	{
		id: 6,
		question: "😌 Calmness\n\nHow calm is your mind right now?",
		options: [
			"🧘 Still as a mountain lake",
			"🌊 Mild ripples, but manageable",
			"🌪️ A mini-storm is brewing",
			"🔥 Brain on fire with thoughts",
		],
	},
	{
		id: 7,
		question: "💪 Resilience\n\nHow ready are you to face challenges today?",
		options: [
			"🛡️ Knight charging into battle",
			"🚴 Pedaling uphill steadily",
			"🚶 Taking small steps with effort",
			"🛑 Don’t even ask me to move",
		],
	},
	{
		id: 8,
		question: "🎨 Joy & Interest\n\nHow interested are you in doing things you love today?",
		options: [
			"🎶 Singing, painting, or creating endlessly",
			"🌱 Happy to do a bit here and there",
			"😐 Meh, nothing excites me much",
			"💤 Just want to sleep, skip everything",
		],
	},
	{
		id: 9,
		question: "🧩 Mental Clarity\n\nHow clear are your thoughts right now?",
		options: [
			"💡 Ideas shining like lightbulbs",
			"🌤️ Some clouds, but sun is visible",
			"🌫️ Brain fog covering most of it",
			"🌑 Total blackout, nothing clear",
		],
	},
	{
		id: 10,
		question: "❤️ Mood\n\nHow’s your overall mood?",
		options: [
			"🌈 Bright and colorful",
			"🙂 Neutral, just fine",
			"🌧️ Gloomy, heavy clouds above",
			"⚡ Irritated or upset",
		],
	},
];

export default function OjasDetectPage() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for Intro
	const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

	const handleOptionClick = (optionIndex: number) => {
		const questionId = quizQuestions[currentQuestionIndex].id;
		setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
	};

	const handleNext = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			// Calculate Ojas score
			let totalScore = 0;
			let maxScore = quizQuestions.length * 4; // 4 is the max per question
			for (const question of quizQuestions) {
				const selected = answers[question.id];
				if (selected !== undefined && selected !== null) {
					// Score: 4 for first option, 3 for second, 2 for third, 1 for fourth
					totalScore += 4 - selected;
				}
			}
			const ojasPercent = Math.round((totalScore / maxScore) * 100);
			alert(`Your Ojas Score: ${ojasPercent}%`);
			// Future scope, to log the answers:
			// const finalAnswers: string[] = [];
			// for (const question of quizQuestions) {
			//   const selected = answers[question.id];
			//   if (selected !== undefined && selected !== null) {
			//     finalAnswers.push(question.options[selected]);
			//   }
			// }
			// console.log(JSON.stringify(finalAnswers, null, 2));
		}
	};

	if (currentQuestionIndex === -1) {
		return (
			<AuroraBackgroundHome>
				<Intro next={() => setCurrentQuestionIndex(0)} />
			</AuroraBackgroundHome>
		);
	}

	const currentQuestion = quizQuestions[currentQuestionIndex];
	const selectedOption = answers[currentQuestion.id];

	return (
		<AuroraBackgroundHome>
			<div className="flex flex-col items-center justify-center min-h-screen gap-8 select-none">
				<h2 className="text-2xl md:text-3xl font-bold text-blue-900 whitespace-pre-line text-center font-inter">
					{currentQuestion.question}
				</h2>
				<div className="flex flex-col gap-4 w-full max-w-md">
					{currentQuestion.options.map((option, idx) => (
						<button
							key={option}
							className={`w-full py-3 px-4 rounded-lg border font-inter text-lg text-left transition-all duration-150
								${selectedOption === idx ? "bg-blue-500 text-white border-blue-700 scale-105" : "bg-white text-blue-900 border-blue-200 hover:bg-blue-100"}
							`}
							onClick={() => handleOptionClick(idx)}
						>
							{option}
						</button>
					))}
				</div>
				<Button
					onClick={handleNext}
					disabled={selectedOption === undefined || selectedOption === null}
					className="mt-6 bg-gradient-to-r from-blue-700 to-blue-400 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out font-inter"
				>
					{currentQuestionIndex === quizQuestions.length - 1 ? "Finish" : "Next"}
					<MoveRight color="#fff" size={22} className="ml-2" />
				</Button>
			</div>
		</AuroraBackgroundHome>
	);
}

function Intro(props: { next: () => void }) {
	return (
		<div className="select-none text-center w-screen h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
			<h1 className="text-4xl font-bold font-inter text-blue-950 sm:text-5xl md:text-6xl">
				Ojas Detect
			</h1>
			<h3 className="text-2xl w-[80%] font-inter text-blue-950 max-sm:text-base">
				Let’s do a quick check-in on your mind and body today!
			</h3>
			<Button
				variant="default"
				size="lg"
				onClick={props.next}
				className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
			>
				Begin
				<MoveRight color="#ffffff" size={24} />
			</Button>
		</div>
	);
}
