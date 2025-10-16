import { HeroSection } from "./components/HeroSection";
import { WhatsNewsSection } from "./components/NewsSection";
import { frameworkFeatures, newsFeatures } from "./data/frameworksData";

export default function HomePage() {
  return (
    <main className="w-full">
      <div className="max-w-6xl mx-auto px-6">
        <HeroSection frameworks={frameworkFeatures} />
        <WhatsNewsSection features={newsFeatures} />
      </div>
    </main>
  );
}
