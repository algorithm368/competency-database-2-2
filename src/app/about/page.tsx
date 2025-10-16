import AboutHero from "./components/AboutHero";
import { TeamSection } from "./components/TeamSection";
import { AdvisorSection } from "./components/AdvisorSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      <AboutHero />
      <TeamSection />
      <AdvisorSection />
    </div>
  );
}
