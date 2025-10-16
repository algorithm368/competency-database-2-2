import { SearchForm } from "./SearchForm";
import { FrameworkCard } from "./FrameworkCard";

interface Framework {
  readonly framework: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly features: string[];
  readonly variant: "blue" | "emerald";
}

interface HeroSectionProps {
  readonly frameworks: Framework[];
}

export function HeroSection({ frameworks }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold pb-6">
          Competency Database
        </h1>

        <p className="text-xl md:text-2xl mb-8 leading-relaxed font-medium">
          Find and Compare SFIA & TPQI Easier
        </p>

        <SearchForm />

        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {frameworks.map((fw) => (
            <FrameworkCard key={fw.framework} framework={fw} index={0} />
          ))}
        </div>
      </div>
    </section>
  );
}
