"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { AiOutlineGithub } from "react-icons/ai";

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
    <div className="flex items-center gap-2 -mr-4 md:mr-0 rounded px-3 py-2 text-sm font-medium transition-colors duration-150 ">
      <div
        className="hover:cursor-pointer hover:opacity-80"
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        {theme === "dark" ? (
          <BsFillSunFill size={20} color="yellow" />
        ) : (
          <BsFillMoonFill size={20} className="text-black/80" />
        )}
      </div>

      <a
        className="hover:cursor-pointer hover:opacity-80"
        href="https://github.com/crusherblack/github-repositories-explorer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiOutlineGithub size={20} />
      </a>
    </div>
  );
};
export default ThemeSwitcher;
