import { GithubSearchUsersResponse } from "@/types/github";
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        {
          error: "username is required",
        },
        { status: 400 }
      );
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const { data }: GithubSearchUsersResponse = await octokit.search.users({
      q: username,
      per_page: 5,
    });

    return NextResponse.json({
      message: "Success",
      data,
    });
  } catch (_error) {
    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
