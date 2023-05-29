"use client";

import React, { KeyboardEvent, useState } from "react";
import Lottie from "lottie-react";
import { useDispatch } from "react-redux";

import Input from "@/components/form/input";

import { setCurrentGithubUsernames } from "@/redux/slice/github";
import { useGetGithubUsersMutation } from "@/services/github";

import heroLottieFile from "@/assets/lottie/hero.json";
import loadingLottieFile from "@/assets/lottie/loading.json";
import notFoundLottieFile from "@/assets/lottie/not-found.json";

import { toErrorWithMessage } from "@/utils/errorHandling";
import Button from "./generics/button";

const Hero = () => {
  const dispatch = useDispatch();
  const [searchGithubUsers, { isLoading }] = useGetGithubUsersMutation();

  const [error, setError] = useState<string | undefined>(undefined);
  const [isNotFound, setIsNotFound] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    try {
      setIsNotFound(false);
      setError(undefined);

      const res = await searchGithubUsers({
        username: input,
      }).unwrap();

      dispatch(setCurrentGithubUsernames(res.data.items));

      if (res.data.items.length === 0) {
        setIsNotFound(true);
      }
    } catch (error) {
      toErrorWithMessage(error, setError);
    }
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:py-48">
        <h1 className="text-center md:text-left font-extrabold text-transparent text-4xl md:text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
          Search Github Username
        </h1>
        <div className="mt-4" />

        <Input
          onKeyDown={onPressEnter}
          placeholder="e.g: crusherblack"
          onChange={(e) => setInput(e.target.value)}
        />
        {error && (
          <p className="mt-2 text-red-500 capitalize text-sm font-semibold">
            {error}
          </p>
        )}
        <Button
          size="large"
          className="mt-4 w-full md:w-fit"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Search User
        </Button>
      </div>
      <div className="relative w-full text-black/90 dark:text-white/90 flex flex-col justify-center items-center">
        <Lottie
          animationData={
            isLoading
              ? loadingLottieFile
              : isNotFound
              ? notFoundLottieFile
              : heroLottieFile
          }
        />
        {isLoading && <p>Searching...</p>}
      </div>
    </div>
  );
};

export default Hero;
