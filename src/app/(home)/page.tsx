import { HeroSection } from "./components/HeroSection";
import { WhatsNewsSection } from "./components/WhatsNewsSection";
import { frameworkFeatures, newsFeatures } from "./data/frameworks";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[var(--background)] via-[var(--card)] to-[var(--background)]">
      <HeroSection frameworks={frameworkFeatures} />
      <WhatsNewsSection features={newsFeatures} />
    </main>
  );
}
