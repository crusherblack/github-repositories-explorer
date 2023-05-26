import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
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

    const {
      data: repos,
    }: Endpoints["GET /users/{username}/repos"]["response"] =
      await octokit.request("GET /users/{username}/repos", {
        username,
      });

    return NextResponse.json({
      message: "Success",
      data: repos,
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
