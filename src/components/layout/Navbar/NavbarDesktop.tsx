"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-client";

export default function DesktopNavbar() {
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message || "Google sign in failed");
    }
  }

  return (
    <nav className="flex justify-between items-center p-4 shadow-sm">
      <div className="text-xl font-bold">Competency</div>
      <div className="flex gap-4">
        <Button asChild variant="link" size="sm">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="link" size="sm">
          <Link href="/about">About</Link>
        </Button>
        <Button asChild variant="link" size="sm">
          <Link href="/tpqi/sector">TPQI</Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 border-0 bg-muted hover:bg-muted/80"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>
      </div>
    </nav>
  );
}
