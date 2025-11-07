import CardStandard from "@/app/about/components/CardStandard";
import CardFeature from "@/app/about/components/CardFeature";
import CardTeam from "@/app/about/components/CardTeam";
import CardAdvisor from "@/app/about/components/CardAdvisor";
import { features } from "@/app/about/data/featureData";
import { standards } from "@/app/about/data/standardData";
import HeaderAbout from "@/app/about/components/HeaderAbout";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background w-full max-w-4xl mx-auto mt-10 px-10">
      {/* Header */}
      <HeaderAbout
        title="About Us"
        titleAs="h1"
        description="Our platform is designed to help individuals identify, evaluate, and enhance their professional competencies based on both national and international skill standards."
      />

      {/* Standard Cards */}
      <section id="about-standard-card" className="space-y-6 mb-20">
        {standards.map((item) => (
          <CardStandard key={item.label} item={item} />
        ))}
      </section>

      {/* Feature Cards */}
      <div className="mb-20">
        {/* Header */}
        <HeaderAbout
          title="System Objectives"
          titleAs="h2"
          description="We aim to bridge the gap between skill recognition and workforce readiness by integrating TPQI and SFIA frameworks. This ensures a precise assessment and targeted development of professional capabilities."
        />
        <section
          id="about-feature-card"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-6 mb-20"
        >
          {features.map((f) => (
            <CardFeature key={f.title} feature={f} />
          ))}
        </section>
      </div>
      <div className="mb-20">
        {/* Header */}
        <HeaderAbout
          title="Our Team"
          titleAs="h2"
          description="Behind this system is a multidisciplinary team of developers experts dedicated to creating tools that promote lifelong learning and career advancement."
        />
        {/* Team Section */}
        <CardTeam />
      </div>
      <div className="mb-20">
        <HeaderAbout
          title="Our Advisor"
          titleAs="h2"
          description="Prof. Suradet Jitprapaikulsarn, our academic advisor, guides the project’s research direction and curriculum alignment. With deep experience in education and workforce competency frameworks, they ensure the system is pedagogically sound and practically useful for learners and employers."
        />
        <CardAdvisor />
      </div>
    </div>
  );
}
