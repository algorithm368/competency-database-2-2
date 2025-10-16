"use client";

import { useCallback } from "react";
import { ChevronDown, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchForm } from "./SearchForm";
import { FrameworkCard } from "./FrameworkCard";

interface Framework {
  framework: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  variant: "blue" | "emerald";
}

interface HeroSectionProps {
  frameworks: Framework[];
}

export function HeroSection({ frameworks }: HeroSectionProps) {
  const scrollToNewFeatures = useCallback(() => {
    document
      .getElementById("version-2-features")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16">
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold pb-6">
          Competency Database
        </h1>

        <p className="text-xl md:text-2xl mb-8 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
          Find and Compare SFIA & TPQI Easier
        </p>

        <SearchForm />

        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {frameworks.map((fw, i) => (
            <FrameworkCard key={fw.framework} framework={fw} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-700">
        <Button
          variant="ghost"
          onClick={scrollToNewFeatures}
          className="flex flex-col items-center text-primary hover:text-accent h-auto p-4 group transition-all duration-300"
        >
          <span className="text-sm font-medium mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            What's New in Version 2
          </span>
          <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform animate-bounce" />
        </Button>
      </div>
    </section>
  );
}
