import AuroraBackgroundHome from "@/components/home/AuroraBackgroundHome";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <AuroraBackgroundHome>
        <div className="relative select-none z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-black font-jakarta text-blue-950 sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r font-jakarta from-blue-700 to-blue-400 bg-clip-text text-transparent [text-shadow:0_0_10px_#93c5fd]">
              Gen Ojas
            </span>
          </h1>
          <p className="text-blue-900 mt-4 text-lg font-inter dark:text-gray-300 sm:text-xl md:text-2xl">
            Your go-to Productivity and Mental Healthcare app.
          </p>

          <Button variant="default" size="lg" className="cursor-pointer my-5 bg-gradient-to-r font-inter from-blue-700 to-blue-400 z-10 hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-110 active:scale-95 transition-all ease-in-out">Get Started</Button>
        </div>
      </AuroraBackgroundHome>
    </>
  );
}
