"use client";

import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

import { authOptions } from "../api/auth/[...nextauth]/route";

const NotesPage = () => {
  const session = useSession();

  console.log("session", session);

  return <div>NotesPage</div>;
};

export default NotesPage;
