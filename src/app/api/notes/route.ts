import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "../auth/[...nextauth]/route";

import prisma from "../../../../lib/prisma";

// eslint-disable-next-line import/prefer-default-export
export const GET = async () => {
  try {
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

    const notes = await prisma.note.findMany({
      where: {
        userId: Number(session.user.id),
      },
      include: {
        user: {
          select: {
            id: true,
            login: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: "success",
      data: {
        notes,
      },
    });
  } catch (error: any | unknown) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "No notes found",
      }),
      { status: 500 }
    );
  }
};
