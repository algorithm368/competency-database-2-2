import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/api/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;

export const signInWithGoogle = () =>
  signIn.social({
    provider: "google",
  });
