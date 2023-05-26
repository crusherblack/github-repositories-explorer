"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="rounded px-3 py-2 text-sm font-medium transition-colors duration-150 hover:cursor-pointer hover:opacity-80"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "dark" ? (
        <BsFillSunFill size={20} color="yellow" />
      ) : (
        <BsFillMoonFill size={20} className="text-black/80" />
      )}
    </div>
  );
};
export default ThemeSwitcher;
