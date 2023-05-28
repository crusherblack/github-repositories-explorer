import { GithubRepoResponse, GithubUsernameResponse } from "@/types/github";
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "";

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

    const { data: profile }: GithubUsernameResponse = await octokit.request(
      "GET /users/{username}",
      {
        username,
      }
    );

    const { data: repos }: GithubRepoResponse = await octokit.request(
      "GET /users/{username}/repos",
      {
        username,
        per_page: profile.public_repos,
      }
    );

    return NextResponse.json({
      message: "Success",
      data: { profile, repos },
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
