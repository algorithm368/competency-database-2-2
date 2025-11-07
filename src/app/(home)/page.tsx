import { HeroSection } from "./components/HeroSection";
import { WhatsNewsSection } from "./components/NewsSection";
import { frameworkFeatures, newsFeatures } from "./data/frameworksData";

export default function HomePage() {
  return (
    <main className="w-full">
      <div className="relative min-h-screen bg-background w-full max-w-4xl mx-auto mt-10 px-10">
        <HeroSection frameworks={frameworkFeatures} />
        <WhatsNewsSection features={newsFeatures} />
      </div>
    </main>
  );
}
