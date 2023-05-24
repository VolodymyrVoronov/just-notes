import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import { authOptions } from "../api/auth/[...nextauth]/route";

import { LoginButton, LogoutButton } from "../auth";

const NotesPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      NotesPage
      <LogoutButton />
      <LoginButton />
    </div>
  );
};

export default NotesPage;
