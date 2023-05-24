import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { authOptions } from "./auth/[...nextauth]/route";

// eslint-disable-next-line import/prefer-default-export
export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      {
        status: 401,
      }
    );
  }

  return NextResponse.json({ authenticated: !!session, session });
};
