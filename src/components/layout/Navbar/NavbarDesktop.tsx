"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginButton from "./LoginButton";
import { useSession } from "@/lib/auth-client";

export default function DesktopNavbar() {
  const { data: session, isPending } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 shadow-sm">
      <div className="text-xl font-bold">Competency</div>
      <div className="flex gap-4 items-center">
        <Button asChild variant="link" size="sm">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="link" size="sm">
          <Link href="/about">About</Link>
        </Button>
        <Button asChild variant="link" size="sm">
          <Link href="/sfia/skill">SFIA</Link>
        </Button>
        <Button asChild variant="link" size="sm">
          <Link href="/tpqi/sector">TPQI</Link>
        </Button>

        {!isPending && session?.user && (
          <Button asChild variant="link" size="sm">
            <Link href="/profile">Profile</Link>
          </Button>
        )}

        <LoginButton />
      </div>
    </nav>
  );
}
