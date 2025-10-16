"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim() !== "") {
        router.push(`/results?query=${encodeURIComponent(searchTerm.trim())}`);
      }
    },
    [searchTerm, router]
  );

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex justify-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 w-full"
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground z-10" />
        <Input
          type="text"
          placeholder="Search competency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-20 h-12 text-base bg-background/80 backdrop-blur-sm transition-all duration-300 focus:shadow-lg"
          aria-label="Search competency"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-105 mr-2"
          variant={"outline"}
        >
          Search
        </Button>
      </div>
    </form>
  );
}
