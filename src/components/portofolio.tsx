"use client";

import React, { useState, Fragment } from "react";
import BrowserMockup from "./generics/browser-mockup";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { AiOutlineClose } from "react-icons/ai";

type Porto = {
  title: string;
  src: string;
  description: string;
  url: string;
};

const data: Porto[] = [
  {
    title: "Supermarket Dashboard",
    src: "/porto/supermarket.png",
    description:
      "Developed interactive Supermarket Dashboard using Power BI to provide real-time insights into sales performance, inventory trends, and customer behavior, enabling data-driven decision-making for improved profitability.",
    url: "https://app.powerbi.com/view?r=eyJrIjoiY2IyNzA1MjUtOTQyNi00ODkxLWI3NDYtODc1ZjE0M2I4MjkxIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    title: "Human Resource Dashboard",
    src: "/porto/human-resource.png",
    description:
      "Designed and implemented dynamic Human Resource Dashboard using Power BI to track employee metrics, monitor recruitment and retention efforts, and optimize workforce planning, resulting in increased efficiency and better talent management.",
    url: "https://app.powerbi.com/view?r=eyJrIjoiYmViNWY4NzAtMTVlZC00ZjhhLTliMzgtNzQxOTNiMTQwNDc2IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    title: "Airbnb",
    src: "/porto/airbnb.png",
    description:
      "Created comprehensive Airbnb Dashboard using Power BI to analyze key performance metrics such as occupancy rates, pricing trends, and guest reviews, enabling hosts to optimize their listings and drive higher revenue.",
    url: "https://app.powerbi.com/view?r=eyJrIjoiMTNiOWJmZWMtNDI1Zi00YTgxLWIwNTYtNWU0MjA3NjRiMjliIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
];

const isEven = (index: number): boolean => index % 2 === 0;

const Portofolio = () => {
  const [embedUrl, setEmbedUrl] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-20 text-gray-600">
      <h2 className="mb-5 text-center md:text-left font-extrabold text-transparent text-4xl md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        My Portofolio
      </h2>
      {data.map((item, index) => (
        <div
          className="grid grid-cols-2 md:h-96 mb-10 gap-5 hover:cursor-pointer hover:opacity-80"
          onClick={() => {
            setEmbedUrl(item.url);
            setIsOpen(true);
          }}
        >
          {isEven(index) ? (
            <>
              <BrowserMockup>
                <img
                  src={item.src}
                  alt={item.title}
                  className={`aspect-auto h-full w-full object-contain`}
                />
              </BrowserMockup>

              <div className="flex justify-center md:items-center w-full dark:text-white/90">
                <div className="max-w-lg ">
                  <h3 className="font-extrabold text-2xl">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center md:items-center w-full dark:text-white/90">
                <div className="max-w-lg ">
                  <h3 className="font-extrabold text-2xl">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
              <BrowserMockup>
                <img
                  src={item.src}
                  alt={item.title}
                  className={`aspect-auto h-full w-full object-contain`}
                />
              </BrowserMockup>
            </>
          )}
        </div>
      ))}

      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Portal forceMount>
          <Transition.Root show={isOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogPrimitive.Overlay
                forceMount
                className="fixed inset-0 z-20 bg-black/50"
              />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPrimitive.Content
                forceMount
                className={clsx(
                  "fixed z-50",
                  "w-full h-full",
                  "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                  "bg-white dark:bg-gray-800",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              >
                <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400 p-10">
                  <iframe src={embedUrl} className="w-full h-[90vh] " />
                </DialogPrimitive.Description>
                <DialogPrimitive.Close
                  className={clsx(
                    "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                >
                  <AiOutlineClose />
                </DialogPrimitive.Close>
              </DialogPrimitive.Content>
            </Transition.Child>
          </Transition.Root>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

export default Portofolio;
