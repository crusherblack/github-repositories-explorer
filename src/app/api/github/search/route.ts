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

    const { data } = await octokit.rest.search.users({
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
