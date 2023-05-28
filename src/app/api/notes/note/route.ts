import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";

import prisma from "../../../../../lib/prisma";

// eslint-disable-next-line import/prefer-default-export
export const POST = async (req: Request) => {
  try {
    const { note, color } = (await req.json()) as {
      note: string;
      color: string;
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

    const newNote = await prisma.note.create({
      data: {
        note,
        color,
        user: { connect: { id: Number(session?.user?.id) } },
      },
    });

    return NextResponse.json({
      status: "success",
      data: {
        note: newNote,
      },
    });
  } catch (error: any | unknown) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Notes could not be created",
      }),
      { status: 500 }
    );
  }
};
