"use client";

import React from "react";
import Accordion, { DisclosureData } from "@/components/generics/accordion";
import { useSelector } from "react-redux";
import { selectCurrentGithubUser } from "@/redux/slice/github";

import GithubProfile from "@/components/github-profile";
import ResultTabHeader from "@/components/result-tab-header";

import { RootState } from "@/redux/store";

const Result = () => {
  const currentGithubUser = useSelector((state: RootState) =>
    selectCurrentGithubUser(state)
  );

  const datasource: DisclosureData[] = currentGithubUser.map((user) => ({
    id: user.id + "",
    header: <ResultTabHeader username={user.login} />,
    content: <GithubProfile username={user.login} />,
  }));

  return currentGithubUser.length > 0 ? (
    <>
      <h2 className="text-center md:text-left font-extrabold text-transparent text-xl mb-2 md:text-2xl bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
        Results:
      </h2>
      <Accordion datasource={datasource} />
    </>
  ) : (
    <></>
  );
};

export default Result;
