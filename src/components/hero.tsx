"use client";

import React from "react";
import Lottie from "lottie-react";
import animation from "./animation.json";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:py-48">
        <h1 className="text-center md:text-left font-extrabold text-transparent text-4xl md:text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
          Search Github Username
        </h1>
        <div className="mt-4" />
        <input className="w-full p-5 bg-white text-black" />
      </div>
      <div className="relative w-full text-black/90 dark:text-white/90 flex justify-center items-center">
        <Lottie animationData={animation} />
      </div>
    </div>
  );
};

export default Hero;
