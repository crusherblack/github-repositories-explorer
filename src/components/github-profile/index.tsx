import { BsFillBuildingFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { HiUsers } from "react-icons/hi";
import { RiGitRepositoryFill } from "react-icons/ri";
import Lottie from "lottie-react";

import Button from "@/components/generics/button";
import Image from "@/components/generics/image";
import IconText from "./icon-text";
import RepoItem from "./repo-item";

import LoadingGitLottieFile from "@/assets/lottie/loading-git.json";
import Input from "../form/input";
import Select from "../form/select";
import useGitubProfileHook from "./hook";

type Props = {
  username: string;
};

const GithubProfile = (props: Props) => {
  const { username } = props;

  const {
    isLoading,
    error,
    profile,
    search,
    repos,
    filter,
    languages,
    setSearch,
    setFilter,
    refetch,
  } = useGitubProfileHook({ username });

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
            <HiUsers className="h-3 w-3" />{" "}
            <p>{profile?.followers} followers</p>
          </div>
          ·
          <div className="flex items-center gap-2 ">
            {profile?.following} following
          </div>
        </div>

        <div className="mt-4" />

        <IconText
          title={profile?.company}
          icon={<BsFillBuildingFill className="h-4 w-4" />}
        />

        <IconText
          title={profile?.location}
          icon={<ImLocation2 className="h-4 w-4" />}
        />
      </div>

      <div className="md:w-9/12">
        <div className="flex items-center gap-2 text-lg mb-2 md:text-xl">
          <RiGitRepositoryFill className=" dark:text-blue-600" />{" "}
          <p className="font-semibold    dark:text-transparent  dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400">
            Repositories
          </p>
        </div>
        <div className="flex mb-2 gap-2">
          <Input
            className="md:w-4/5"
            placeholder="Find a repository..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Select
            className="md:w-1/5"
            placeholder="Language"
            options={languages}
            onChange={(e) => {
              const value = e.target.value;
              setFilter(value === "All" ? "" : e.target.value);
            }}
            value={filter}
          />
        </div>
        {repos &&
          repos?.length > 0 &&
          repos?.map((repo) => <RepoItem key={repo.id} repo={repo} />)}
      </div>
    </div>
  );
};

export default GithubProfile;
