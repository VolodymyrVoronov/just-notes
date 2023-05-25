import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "../../../../lib/prisma";

// eslint-disable-next-line import/prefer-default-export
export const POST = async (req: Request) => {
  console.log("req.body", req, req.body);

  try {
    const { login, password } = (await req.json()) as {
      login: string;
      password: string;
    };
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      user: {
        login: user.login,
        password: user.password,
      },
    });
  } catch (error: any | unknown) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "User already exists",
      }),
      { status: 500 }
    );
  }
};
