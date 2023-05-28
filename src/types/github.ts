import { Endpoints } from "@octokit/types";

export type GithubRepoResponse =
  Endpoints["GET /users/{username}/repos"]["response"];
export type GithubSearchUsersResponse =
  Endpoints["GET /search/users"]["response"];
export type GithubUsernameResponse =
  Endpoints["GET /users/{username}"]["response"];

export type GithubUser =
  Endpoints["GET /search/users"]["response"]["data"]["items"][0];
