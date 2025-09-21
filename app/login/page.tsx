"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- import router
import AuroraBackgroundHome from "@/components/home/AuroraBackgroundHome";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [signIn, toggle] = useState(true);
  const router = useRouter(); // <-- initialize router

  // Sign Up form handler
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Add API call to register user here

    // Redirect to welcome page after signup
    router.push("/welcome");
  };

  return (
    <AuroraBackgroundHome>
      <div className="relative select-none z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-black font-jakarta text-blue-950 sm:text-5xl md:text-6xl mb-6">
          {signIn ? "Welcome Back" : "Hello, Friend!"}
          <br />
          <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent [text-shadow:0_0_10px_#93c5fd]">
            Gen Ojas
          </span>
        </h1>
        <p className="text-blue-900 mt-2 text-lg font-inter sm:text-xl md:text-2xl mb-10">
          {signIn
            ? "Login to continue your journey"
            : "Enter your details and start your journey with us"}
        </p>

        {/* Main Box */}
        <div className="relative w-[80vw] max-w-[1400px] h-[450px] flex shadow-2xl rounded-4xl overflow-hidden bg-white/90 backdrop-blur-xl border border-blue-100">
          
          {/* Sign In Form */}
          <div
            className={`absolute top-0 left-0 w-[50%] h-full flex flex-col justify-center items-center p-16 transition-transform duration-700 ${
              signIn ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Sign In</h2>
            <form className="flex flex-col gap-6 w-full max-w-xs">
              <input
                type="email"
                placeholder="Email"
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline self-end"
              >
                Forgot password?
              </a>
              <Button
                type="submit"
                className="mt-4 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-105 active:scale-95 transition-all"
              >
                Sign In
              </Button>
            </form>
          </div>

          {/* Sign Up Form */}
          <div
            className={`absolute top-0 right-0 w-[50%] h-full flex flex-col justify-center items-center p-16 transition-transform duration-700 ${
              signIn ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Sign Up</h2>
            <form
              className="flex flex-col gap-6 w-full max-w-xs"
              onSubmit={handleSignUp} // <-- navigate to /welcome
            >
              <input
                type="text"
                placeholder="Name"
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button
                type="submit"
                className="mt-4 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold hover:shadow-[0px_0px_25px_0px_#93c5fd] hover:scale-105 active:scale-95 transition-all"
              >
                Sign Up
              </Button>
            </form>
          </div>

          {/* Overlay */}
          <div
            className={`absolute top-0 left-[50%] w-[50%] h-full bg-gradient-to-r from-blue-700 to-blue-400 text-white flex flex-col justify-center items-center p-16 transition-transform duration-700 ${
              signIn ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {signIn ? (
              <>
                <h3 className="text-3xl font-bold mb-4 opacity-100">
                  Hello, Friend!
                </h3>
                <p className="mb-6 opacity-100">
                  Enter your personal details and start your journey with us
                </p>
                <Button
                  variant="outline"
                  onClick={() => toggle(false)}
                  className="border-white text-white hover:bg-white hover:text-blue-700 transition-all"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-bold mb-4 opacity-100">
                  Welcome Back!
                </h3>
                <p className="mb-6 opacity-100">
                  To keep connected with us, please login with your personal info
                </p>
                <Button
                  variant="outline"
                  onClick={() => toggle(true)}
                  className="border-white text-white hover:bg-white hover:text-blue-700 transition-all"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </AuroraBackgroundHome>
  );
}
