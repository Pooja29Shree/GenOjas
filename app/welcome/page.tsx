"use client";

import AuroraBackgroundHome from "@/components/home/AuroraBackgroundHome";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function Page() {
  const [orderControl, setOrderControl] = useState(0);
  const [optionsChosen, setOptionsChosen] = useState<boolean[][]>([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);
  const order = [
    <Intro next={next} />,
    <Q1
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q2
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q3
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q4
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q5
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q6
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q7
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q8
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q9
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q10
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q11
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q12
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q13
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q14
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
    <Q15
      next={next}
      optionsChosen={optionsChosen}
      setOptionsChosen={setOptionsChosen}
    />,
  ];

  function next() {
    if (orderControl < order.length - 1) {
      setOrderControl(orderControl + 1);
    }
  }

  return <AuroraBackgroundHome>{order[orderControl]}</AuroraBackgroundHome>;
}

function Intro(props: { next: () => void }) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
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
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Begin
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q1(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        When you feel stressed, what helps you most?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[0][0] = !newOptions[0][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[0][0],
              "bg-white/10": !props.optionsChosen[0][0],
            }
          )}
        >
          Listening to music
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[0][1] = !newOptions[0][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[0][1],
              "bg-white/10": !props.optionsChosen[0][1],
            }
          )}
        >
          Talking to Someone
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[0][2] = !newOptions[0][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[0][2],
              "bg-white/10": !props.optionsChosen[0][2],
            }
          )}
        >
          Resting
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[0][3] = !newOptions[0][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[0][3],
              "bg-white/10": !props.optionsChosen[0][3],
            }
          )}
        >
          Exercising
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q2(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        Which emotions do you experience most often?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[1][0] = !newOptions[1][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[1][0],
              "bg-white/10": !props.optionsChosen[1][0],
            }
          )}
        >
          Joy/Excitement
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[1][1] = !newOptions[1][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[1][1],
              "bg-white/10": !props.optionsChosen[1][1],
            }
          )}
        >
          Calm/Contentment
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[1][2] = !newOptions[1][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[1][2],
              "bg-white/10": !props.optionsChosen[1][2],
            }
          )}
        >
          Worry/Anxiety
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[1][3] = !newOptions[1][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[1][3],
              "bg-white/10": !props.optionsChosen[1][3],
            }
          )}
        >
          Sadness/Loneliness
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q3(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        How do you usually express difficult feelings?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[2][0] = !newOptions[2][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[2][0],
              "bg-white/10": !props.optionsChosen[2][0],
            }
          )}
        >
          📝 Writing/journaling
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[2][1] = !newOptions[2][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[2][1],
              "bg-white/10": !props.optionsChosen[2][1],
            }
          )}
        >
          🎨 Creative outlets (art, music, dance)
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[2][2] = !newOptions[2][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[2][2],
              "bg-white/10": !props.optionsChosen[2][2],
            }
          )}
        >
          💬 Talking with someone
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[2][3] = !newOptions[2][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[2][3],
              "bg-white/10": !props.optionsChosen[2][3],
            }
          )}
        >
          🤐 Keeping it inside
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q4(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        What motivates you most in life?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[3][0] = !newOptions[3][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[3][0],
              "bg-white/10": !props.optionsChosen[3][0],
            }
          )}
        >
          🎯 Achieving goals
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[3][1] = !newOptions[3][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[3][1],
              "bg-white/10": !props.optionsChosen[3][1],
            }
          )}
        >
          ❤ Building relationships
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[3][2] = !newOptions[3][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[3][2],
              "bg-white/10": !props.optionsChosen[3][2],
            }
          )}
        >
          🌍 Exploring/learning
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[3][3] = !newOptions[3][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[3][3],
              "bg-white/10": !props.optionsChosen[3][3],
            }
          )}
        >
          🧘 Peace of mind
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q5(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        When facing challenges, you usually…
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[4][0] = !newOptions[4][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[4][0],
              "bg-white/10": !props.optionsChosen[4][0],
            }
          )}
        >
          🧩 Think logically and plan
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[4][1] = !newOptions[4][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[4][1],
              "bg-white/10": !props.optionsChosen[4][1],
            }
          )}
        >
          💡 Look for creative alternatives
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[4][2] = !newOptions[4][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[4][2],
              "bg-white/10": !props.optionsChosen[4][2],
            }
          )}
        >
          🤝 Seek help/support
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[4][3] = !newOptions[4][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[4][3],
              "bg-white/10": !props.optionsChosen[4][3],
            }
          )}
        >
          🙏 Trust instincts/go with the flow
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q6(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        Which environment makes you feel most “yourself”?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[5][0] = !newOptions[5][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[5][0],
              "bg-white/10": !props.optionsChosen[5][0],
            }
          )}
        >
          🌲 Nature/outdoors
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[5][1] = !newOptions[5][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[5][1],
              "bg-white/10": !props.optionsChosen[5][1],
            }
          )}
        >
          🏙 Busy city spaces
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[5][2] = !newOptions[5][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[5][2],
              "bg-white/10": !props.optionsChosen[5][2],
            }
          )}
        >
          🏠 Cozy home spaces
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[5][3] = !newOptions[5][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[5][3],
              "bg-white/10": !props.optionsChosen[5][3],
            }
          )}
        >
          🎉 Social gatherings
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q7(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        Which type of connection do you value most?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[6][0] = !newOptions[6][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[6][0],
              "bg-white/10": !props.optionsChosen[6][0],
            }
          )}
        >
          👫 Close friends
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[6][1] = !newOptions[6][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[6][1],
              "bg-white/10": !props.optionsChosen[6][1],
            }
          )}
        >
          💕 Romantic partner
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[6][2] = !newOptions[6][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[6][2],
              "bg-white/10": !props.optionsChosen[6][2],
            }
          )}
        >
          👨‍👩‍👧 Family
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[6][3] = !newOptions[6][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[6][3],
              "bg-white/10": !props.optionsChosen[6][3],
            }
          )}
        >
          🌐 Community/like-minded groups
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q8(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        When meeting new people, you are usually…
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[7][0] = !newOptions[7][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[7][0],
              "bg-white/10": !props.optionsChosen[7][0],
            }
          )}
        >
          🗣 Outgoing & open
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[7][1] = !newOptions[7][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[7][1],
              "bg-white/10": !props.optionsChosen[7][1],
            }
          )}
        >
          🤔 Reserved but warm up later
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[7][2] = !newOptions[7][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[7][2],
              "bg-white/10": !props.optionsChosen[7][2],
            }
          )}
        >
          👂 A good listener
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[7][3] = !newOptions[7][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[7][3],
              "bg-white/10": !props.optionsChosen[7][3],
            }
          )}
        >
          😅 A bit anxious
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q9(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        How do you like to spend free time?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[8][0] = !newOptions[8][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[8][0],
              "bg-white/10": !props.optionsChosen[8][0],
            }
          )}
        >
          📚 Reading/learning
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[8][1] = !newOptions[8][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[8][1],
              "bg-white/10": !props.optionsChosen[8][1],
            }
          )}
        >
          🎮 Games/entertainment
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[8][2] = !newOptions[8][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[8][2],
              "bg-white/10": !props.optionsChosen[8][2],
            }
          )}
        >
          🎨 Creative hobbies
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[8][3] = !newOptions[8][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[8][3],
              "bg-white/10": !props.optionsChosen[8][3],
            }
          )}
        >
          🛌 Relaxing/resting
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q10(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        What gives you a sense of purpose?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[9][0] = !newOptions[9][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[9][0],
              "bg-white/10": !props.optionsChosen[9][0],
            }
          )}
        >
          🌍 Helping others
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[9][1] = !newOptions[9][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[9][1],
              "bg-white/10": !props.optionsChosen[9][1],
            }
          )}
        >
          🎯 Achievements & growth
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[9][2] = !newOptions[9][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[9][2],
              "bg-white/10": !props.optionsChosen[9][2],
            }
          )}
        >
          🧘 Peace & balance
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[9][3] = !newOptions[9][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[9][3],
              "bg-white/10": !props.optionsChosen[9][3],
            }
          )}
        >
          🎨 Self-expression
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q11(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        Which of these self-care activities do you connect with?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[10][0] = !newOptions[10][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[10][0],
              "bg-white/10": !props.optionsChosen[10][0],
            }
          )}
        >
          🛁 Relaxation (spa, bath, naps)
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[10][1] = !newOptions[10][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[10][1],
              "bg-white/10": !props.optionsChosen[10][1],
            }
          )}
        >
          🏃 Physical activity (sports, yoga, walks)
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[10][2] = !newOptions[10][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[10][2],
              "bg-white/10": !props.optionsChosen[10][2],
            }
          )}
        >
          🎶 Creative/expressive hobbies
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[10][3] = !newOptions[10][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[10][3],
              "bg-white/10": !props.optionsChosen[10][3],
            }
          )}
        >
          💬 Meaningful conversations
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q12(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        How do you usually recharge after a long day?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[11][0] = !newOptions[11][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[11][0],
              "bg-white/10": !props.optionsChosen[11][0],
            }
          )}
        >
          😴 Sleep/quiet time
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[11][1] = !newOptions[11][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[11][1],
              "bg-white/10": !props.optionsChosen[11][1],
            }
          )}
        >
          📺 Entertainment (TV, movies, games)
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[11][2] = !newOptions[11][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[11][2],
              "bg-white/10": !props.optionsChosen[11][2],
            }
          )}
        >
          🗣 Talking with loved ones
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[11][3] = !newOptions[11][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[11][3],
              "bg-white/10": !props.optionsChosen[11][3],
            }
          )}
        >
          🌲 Time in nature
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q13(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        Which describes you best?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[12][0] = !newOptions[12][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[12][0],
              "bg-white/10": !props.optionsChosen[12][0],
            }
          )}
        >
          🧠 Thinker (logical, analytical)
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[12][1] = !newOptions[12][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[12][1],
              "bg-white/10": !props.optionsChosen[12][1],
            }
          )}
        >
          ❤ Feeler (emotional, empathetic)
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[12][2] = !newOptions[12][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[12][2],
              "bg-white/10": !props.optionsChosen[12][2],
            }
          )}
        >
          🎨 Creator (imaginative, expressive)
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[12][3] = !newOptions[12][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[12][3],
              "bg-white/10": !props.optionsChosen[12][3],
            }
          )}
        >
          🚀 Explorer (curious, adventurous)
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q14(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        Which values resonate with you most?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[13][0] = !newOptions[13][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[13][0],
              "bg-white/10": !props.optionsChosen[13][0],
            }
          )}
        >
          🤝 Loyalty & trust
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[13][1] = !newOptions[13][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[13][1],
              "bg-white/10": !props.optionsChosen[13][1],
            }
          )}
        >
          💡 Growth & learning
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[13][2] = !newOptions[13][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[13][2],
              "bg-white/10": !props.optionsChosen[13][2],
            }
          )}
        >
          ❤ Kindness & compassion
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[13][3] = !newOptions[13][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[13][3],
              "bg-white/10": !props.optionsChosen[13][3],
            }
          )}
        >
          🧘 Peace & balance
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Next
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}

function Q15(props: {
  next: () => void;
  optionsChosen: boolean[][];
  setOptionsChosen: (options: boolean[][]) => void;
}) {
  return (
    <div className="select-none text-center w-screen, h-screen gap-5 flex-col flex justify-center items-center overflow-clip">
      <h3 className="text-2xl font-semibold font-inter text-blue-950">
        What do you hope to improve most in your mental wellness journey?
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[14][0] = !newOptions[14][0];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[14][0],
              "bg-white/10": !props.optionsChosen[14][0],
            }
          )}
        >
          😌 Managing stress & anxiety
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[14][1] = !newOptions[14][1];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[14][1],
              "bg-white/10": !props.optionsChosen[14][1],
            }
          )}
        >
          🌙 Sleep & relaxation
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[14][2] = !newOptions[14][2];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[14][2],
              "bg-white/10": !props.optionsChosen[14][2],
            }
          )}
        >
          🤝 Building healthy relationships
        </div>

        <div
          onClick={() => {
            const newOptions = props.optionsChosen.map((inner) => [...inner]);
            newOptions[14][3] = !newOptions[14][3];
            props.setOptionsChosen(newOptions);
          }}
          className={clsx(
            "font-jakarta font-medium text-base cursor-pointer text-blue-900/80 w-35 h-35 border-2 border-blue-500/20 rounded-lg text-center flex justify-center items-center hover:scale-110 active:scale-100 transition-all ease-in-out",
            {
              "bg-blue-200/50": props.optionsChosen[14][3],
              "bg-white/10": !props.optionsChosen[14][3],
            }
          )}
        >
          🎯 Self-confidence & growth
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={props.next}
        className="cursor-pointer bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out"
      >
        Finish
        <MoveRight color={"#ffffff"} size={24} />
      </Button>
    </div>
  );
}
