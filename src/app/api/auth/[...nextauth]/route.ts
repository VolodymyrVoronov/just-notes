import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "../../../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/start",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        login: {
          label: "Login",
          type: "text",
          placeholder: "test-user",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.login || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            login: credentials.login,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(user.id),
          login: user.login,
          randomKey:
            "test-test-test-do-not-use-it-in-production-generate-real-random-key",
        };
      },
    }),
  ],

  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          login: token.login,
          randomKey: token.randomKey,
        },
      };
    },

    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;

        return {
          ...token,
          id: u.id,
          login: u.login,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
