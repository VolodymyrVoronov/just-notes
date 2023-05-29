import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "../../../auth/[...nextauth]/route";

import prisma from "../../../../../../lib/prisma";

// eslint-disable-next-line import/prefer-default-export
export const PUT = async (req: Request) => {
  try {
    const { id, favorite } = (await req.json()) as {
      id: number;
      favorite: boolean;
    };

    interface ISession {
      user: {
        id: number;
      };
    }

    const session = (await getServerSession(authOptions)) as ISession;

    if (!session) {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "You are not logged in" }),
        {
          status: 401,
        }
      );
    }

    await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        favorite,
      },
    });

    return NextResponse.json({
      status: "success",
    });
  } catch (error: any | unknown) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Notes could not be deleted",
      }),
      { status: 500 }
    );
  }
};
