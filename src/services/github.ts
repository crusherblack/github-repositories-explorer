import {
  GithubRepoResponse,
  GithubSearchUsersResponse,
  GithubUsernameResponse,
} from "@/types/github";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ReposResponse = {
  message: string;
  data: {
    profile: GithubUsernameResponse["data"];
    repos: GithubRepoResponse["data"];
  };
};

type GithubSearchUsersParams = {
  username: string;
};

export const githubApi = createApi({
  reducerPath: "github-api",
  tagTypes: ["github-api"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/github",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }),
  endpoints: (builder) => ({
    getGithubUsers: builder.mutation<
      GithubSearchUsersResponse,
      GithubSearchUsersParams
    >({
      query: ({ username }) => ({
        url: `/search`,
        method: "POST",
        body: {
          username,
        },
      }),
    }),
    getGithubUserRepositories: builder.query<ReposResponse, string>({
      query: (username) => ({
        url: `/repos`,
        params: {
          username,
        },
      }),
      providesTags: (_result, _error, username) => [
        { type: "github-api", username },
      ],
    }),
  }),
});

export const { useGetGithubUsersMutation, useGetGithubUserRepositoriesQuery } =
  githubApi;
