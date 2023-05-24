"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button onClick={() => signIn()} type="button">
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} type="button">
      Sign Out
    </button>
  );
};
