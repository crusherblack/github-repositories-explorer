import React, { useMemo } from "react";
import { useGetGithubUserRepositoriesQuery } from "@/services/github";
import { BsFillBuildingFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import Lottie from "lottie-react";
import { HiUsers } from "react-icons/hi";
import { RiGitRepositoryFill } from "react-icons/ri";

import LoadingGitLottieFile from "@/assets/lottie/loading-git.json";
import Button from "./generics/button";
import { AiFillStar } from "react-icons/ai";
import Image from "@/components/generics/image";

type Props = {
  username: string;
};

const GithubProfile = (props: Props) => {
  const { username } = props;
  const { data, isLoading, error, refetch } =
    useGetGithubUserRepositoriesQuery(username);

  const profile = useMemo(() => data?.data?.profile, [data]);
  const repos = useMemo(() => data?.data?.repos, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Lottie animationData={LoadingGitLottieFile} className="h-20 w-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-24 flex-col gap-2">
        <h2 className="text-xl text-red-500 font-extrabold">
          Internal Server Error
        </h2>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-2 p-4">
      <div className="md:w-3/12 flex items-center flex-col">
        <div className="w-48 h-48 relative">
          <Image
            src={profile?.avatar_url || ""}
            alt={profile?.login + "avatar"}
            className="rounded-full"
          />
        </div>

        <div className="mt-8" />

        <a
          href={profile?.html_url}
          target="_blank"
          className="text-base hover:underline"
        >
          {profile?.name}
        </a>
        <a
          href={profile?.html_url}
          target="_blank"
          className="text-sm hover:underline"
        >
          @{profile?.login}
        </a>

        <div className="mt-4" />

        <p className="w-full break-words text-base">{profile?.bio}</p>

        <div className="mt-4" />

        <div className="flex items-center text-sm gap-1 w-full flex-start">
          <div className="flex items-center gap-2 ">
            <HiUsers /> <p>{profile?.followers} followers</p>
          </div>
          ·
          <div className="flex items-center gap-2 ">
            {profile?.following} following
          </div>
        </div>

        <div className="mt-4" />

        <div className="flex items-center gap-2 w-full flex-start mb-2">
          <BsFillBuildingFill />
          {profile?.company || "-"}
        </div>

        <div className="flex items-center gap-2 w-full flex-start">
          <ImLocation2 />
          {profile?.location || "-"}
        </div>
      </div>

      <div className="md:w-9/12">
        <div className="flex items-center gap-2 text-lg mb-2 md:text-xl">
          <RiGitRepositoryFill className=" dark:text-blue-600" />{" "}
          <p className="font-semibold    dark:text-transparent  dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400">
            Repositories
          </p>
        </div>
        {repos &&
          repos?.length > 0 &&
          repos?.map((repo) => (
            <div className="border-t md:flex md:justify-between border-gray-600 p-2 min-h-[6rem]">
              <div className="md:w-4/5">
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="font-semibold dark:text-transparent hover:underline text-sm mb-2 md:text-base text-blue-600 dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400"
                >
                  {repo.full_name}
                </a>
                <p className="text-xs mb-2 md:text-sm mt-2">
                  {repo.description}
                </p>
                {repo.language && (
                  <span className="text-xs border dark:bg-gray-700 p-1 rounded-md ">
                    {repo.language}
                  </span>
                )}
              </div>

              <div className="md:w-1/5 flex items-start">
                <div className="flex items-center justify-end w-full gap-1 dark:text-yellow-300 text-xs md:text-sm">
                  <AiFillStar />
                  {repo.stargazers_count} star
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GithubProfile;
