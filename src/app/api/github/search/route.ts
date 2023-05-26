import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "";

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const { data }: Endpoints["GET /users/{username}/repos"]["response"] =
    await octokit.request("GET /users/{username}/repos", {
      username,
    });

  return NextResponse.json({
    data,
  });
};
