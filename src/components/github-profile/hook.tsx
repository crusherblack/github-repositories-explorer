import { useState, useMemo } from "react";
import { useGetGithubUserRepositoriesQuery } from "@/services/github";

const useGitubProfileHook = ({ username }: { username: string }) => {
  const { data, isLoading, error, refetch } =
    useGetGithubUserRepositoriesQuery(username);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const profile = useMemo(() => data?.data?.profile, [data]);
  const repos = useMemo(() => {
    return data?.data?.repos.filter((repo) => {
      const searchConditionMeet = repo.full_name
        .toLowerCase()
        .includes(search.toLocaleLowerCase());

      return searchConditionMeet && filter === "Unknown"
        ? !repo?.language
        : !filter
        ? true && searchConditionMeet
        : repo?.language?.toLowerCase().includes(filter.toLocaleLowerCase()) &&
          searchConditionMeet;
    });
  }, [data, search, filter]);

  const languages = useMemo(() => {
    const temp = new Map();

    data?.data?.repos.forEach((repo) => {
      if (!temp.has(repo.language)) {
        repo.language ? temp.set(repo.language, "") : temp.set("Unknown", "");
      }
    });

    let languagesOptions = [
      {
        value: "All",
        label: "All",
      },
    ];

    languagesOptions.push(
      ...Array.from(temp.keys()).map((item) => ({
        value: item,
        label: item,
      }))
    );

    return languagesOptions;
  }, [data]);

  return {
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
  };
};

export default useGitubProfileHook;
