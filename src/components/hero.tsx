"use client";

import React from "react";
import Button from "./generics/button";
import clsx from "clsx";
import Lottie from "lottie-react";
import animation from "./animation.json";

type LogoAbsoluteProps = {
  title: string;
  url: string;
  className: string;
};

const logos: LogoAbsoluteProps[] = [
  {
    title: "Power BI",
    url: "https://cdn.windowsreport.com/wp-content/uploads/2019/07/Fix-power-bi-cant-find-app.jpg",
    className: "left-8 top-40",
  },
  {
    title: "Python",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
    className: "right-14 top-40",
  },
  {
    title: "Tableu",
    url: "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png",
    className: "right-14 bottom-40",
  },
  {
    title: "R. ",
    url: "data:image/jpeg;base64,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",
    className: "left-11 bottom-60",
  },
  {
    title: "PostgreSQL",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png",
    className: "-right-14 bottom-60",
  },
  {
    title: "MySQL",
    url: "https://cdn-icons-png.flaticon.com/512/5968/5968313.png",
    className: "left-20 bottom-44",
  },
];

const LogoAbsolute = (props: LogoAbsoluteProps) => {
  const { title, url, className } = props;

  return (
    <div
      className={clsx(
        "animate-pulse hidden md:flex items-center gap-2 border p-2 w-fit rounded-lg absolute bg-white/80 dark:bg-gray-800 dark:border-gray-700 hover:scale-125 hover:transition hover:ease-in-out hover:cursor-pointer",
        className
      )}
    >
      <img src={url} className="h-8 w-8 rounded-lg object-cover" />
      <p className="text-sm ">{title}</p>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:py-48">
        <h1 className="text-center md:text-left font-extrabold text-transparent text-6xl md:text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Hello
        </h1>
        <h1 className="text-center md:text-left font-extrabold text-transparent text-4xl md:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          I'am Mesrawati Hia
        </h1>
        <div className="mb-4" />
        <p className="text-center md:text-left text-gray-500 font-medium dark:text-white/90">
          Data-driven problem solver with a year of experience in data analysis,
          skilled in utilizing statistical methods, data visualization, and
          machine learning techniques to uncover actionable insights that drive
          business growth and optimize decision-making.
        </p>
        <div className="mb-4" />
        <div className="hidden md:flex justify-center md:justify-start">
          <a href="https://wa.me/+6282287606400" target="_blank">
            <Button>Contact Me</Button>
          </a>
        </div>
      </div>
      <div className="relative w-full text-black/90 dark:text-white/90 flex justify-center items-center">
        {logos.map((item) => (
          <LogoAbsolute
            key={item.title}
            title={item.title}
            className={item.className}
            url={item.url}
          />
        ))}

        <Lottie animationData={animation} />

        {/* <img
          src="/omess.jpg"
          alt="my-photo"
          className="w-full object-cover rounded-md max-h-[80vh] object-bottom"
        /> */}
      </div>

      <div className=" md:hidden grid grid-cols-6 mt-8 gap-2">
        {logos.map((item) => (
          <div>
            <img src={item.url} className="object-contain object-center" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
