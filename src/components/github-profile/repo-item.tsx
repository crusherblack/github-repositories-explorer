import React from "react";

import { GithubRepoResponse } from "@/types/github";
import { AiFillStar } from "react-icons/ai";

type Props = {
  repo: GithubRepoResponse["data"][0];
  index: number;
};

const RepoItem = (props: Props) => {
  const { repo, index: _ } = props;
  return (
    <div
      key={repo.id}
      className="border-t md:flex md:justify-between border-gray-600 p-2 min-h-[6rem]"
    >
      <div className="md:w-4/5">
        <a
          href={repo.html_url}
          target="_blank"
          className="font-semibold dark:text-transparent hover:underline text-sm mb-2 md:text-base text-blue-600 dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400"
        >
          {repo.full_name}
        </a>
        <p className="text-xs md:text-sm mt-2">{repo.description}</p>
        {repo.language && (
          <span className="text-xs border dark:bg-gray-700 p-1 rounded-md ">
            {repo.language}
          </span>
        )}
      </div>

      <div className="md:w-1/5 flex items-start">
        <div className="flex items-center mt-2 md:mt-0 md:justify-end w-full gap-1 dark:text-yellow-300 text-xs md:text-sm">
          <AiFillStar />
          {repo.stargazers_count} star
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
