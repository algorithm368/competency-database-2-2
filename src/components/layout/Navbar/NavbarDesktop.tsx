import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DesktopNavbar() {
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
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </nav>
  );
}
