"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signInWithGoogle, useSession, signOut } from "@/lib/auth-client";

export default function LoginButton() {
  const { data, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  }

  if (data?.user) {
    return (
      <div className="flex items-center gap-2">
        <Image
          src={data.user.image ?? "/default.png"}
          alt={data.user.name ?? "User"}
          width={24}
          height={24}
          className="rounded-full object-cover"
        />
        <Button
          onClick={() => signOut()}
          variant="outline"
          size="sm"
          className="ml-2"
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={loading || isPending}
      variant="outline"
      size="sm"
    >
      {loading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
}
