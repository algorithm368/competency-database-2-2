"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 shadow-sm">
      <div className="text-xl font-bold">Logo</div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">☰</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col gap-4 mt-4">
            <Button variant="link" onClick={() => setOpen(false)}>
              Home
            </Button>
            <Button variant="link" onClick={() => setOpen(false)}>
              About
            </Button>
            <Button variant="link" onClick={() => setOpen(false)}>
              Contact
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
