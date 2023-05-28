"use client";

import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const callback = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", callback);

    return () => {
      window.removeEventListener("scroll", callback);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="fixed bottom-6  right-6 text-3xl z-10 cursor-pointer text-teal-400 bg-transparent rounded-full px-0 border-none opacity-70"
      style={{ display: isVisible ? "block" : "none" }}
      onClick={goTop}
    >
      <FaArrowCircleUp />
    </button>
  );
};

export default ScrollToTop;
