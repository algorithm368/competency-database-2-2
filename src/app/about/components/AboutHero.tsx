"use client";

import { Target, User, BarChart3, RefreshCw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Types
type Standard = {
  label: string;
  link: string;
  description: string;
  lastUpdated: string;
};

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

// Data
const standards: Standard[] = [
  {
    label: "TPQI (Thailand Professional Qualification Institute)",
    link: "https://www.tpqi.go.th/th/standard/rQNWewEb3Q",
    description:
      "National competency standards used as criteria for measuring capabilities in each professional field",
    lastUpdated: "Last updated on January 5, 2021",
  },
  {
    label: "SFIA (Skills Framework for the Information Age) Version 9",
    link: "https://sfia-online.org",
    description: "Globally recognized digital and IT skills standards",
    lastUpdated: "Published in October 2021",
  },
];

const features: Feature[] = [
  {
    title: "Assess Skills According to TPQI and SFIA Standards",
    description:
      "Helps analyze individual potential and compare it with standard criteria in related professional fields",
    icon: Target,
  },
  {
    title: "Create Personal Competency Profile",
    description:
      "Compile skills data, capabilities, and portfolio for job applications or personal development",
    icon: User,
  },
  {
    title: "Display Analysis Results with Charts",
    description:
      "Helps visualize strengths, areas for improvement, and systematic skill development pathways",
    icon: BarChart3,
  },
  {
    title: "Support Skills and Career Data Updates",
    description:
      "Ability to update personal information and connect with the latest competency standards",
    icon: RefreshCw,
  },
];

// Components
const AboutHeader = () => (
  <header className="text-center">
    <h1 className="text-4xl md:text-5xl font-bold bg-primary bg-clip-text text-transparent mb-6 pt-5 tracking-tight">
      About Us
    </h1>
    <div className="w-12 h-px bg-primary mx-auto mb-8"></div>
    <p className="text-lg md:text-xl text-primary leading-relaxed max-w-3xl mx-auto font-medium">
      This system helps individuals assess and develop their skills according to
      nationally and internationally recognized standards
    </p>
  </header>
);

const StandardCard = ({ item }: { item: Standard }) => (
  <Card className="p-0 overflow-hidden">
    <CardHeader className="px-6 pt-6 flex justify-between items-start">
      <div>
        <CardTitle className="text-lg text-gray-900">{item.label}</CardTitle>
        <CardDescription className="mt-1 text-sm text-gray-600">
          {item.description}
        </CardDescription>
      </div>
      <Badge variant="outline">Standard</Badge>
    </CardHeader>
    <CardContent className="px-6 pb-4 text-sm text-muted-foreground">
      {item.lastUpdated}
    </CardContent>
    <CardFooter className="px-6 pb-6 pt-0">
      <Button asChild variant="link" size="sm">
        <a href={item.link} target="_blank" rel="noreferrer">
          Open standard
        </a>
      </Button>
    </CardFooter>
  </Card>
);

const StandardsSection = () => (
  <section className="space-y-6">
    {standards.map((item) => (
      <StandardCard key={item.label} item={item} />
    ))}
  </section>
);

const PurposeSection = () => (
  <section>
    <div className="text-center mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
        System Objectives
      </h2>
      <div className="w-8 h-px bg-background mx-auto"></div>
    </div>
    <div className="bg-background rounded-2xl p-8 shadow-lg">
      <p className="text-lg text-primary leading-relaxed text-center">
        This system helps individuals accurately assess competencies by
        referencing <span className="font-semibold text-primary">TPQI</span> and{" "}
        <span className="font-semibold text-primary">SFIA</span> standards,
        supporting skill development aligned with labor market demands.
      </p>
    </div>
  </section>
);

const FeatureCard = ({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-primary mb-1">{feature.title}</h3>
          <p className="text-primary text-sm">{feature.description}</p>
        </div>
      </div>
    </Card>
  );
};

const FeaturesSection = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {features.map((f) => (
      <FeatureCard key={f.title} feature={f} />
    ))}
  </section>
);

// Main Section
export default function AboutHero() {
return (
    <section
      id="about-section"
      className="relative min-h-screen flex flex-col items-center justify-center w-full overflow-hidden mt-10 space-y-20"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 space-y-20">
        <AboutHeader />
        <StandardsSection />
        <PurposeSection />
        <FeaturesSection />
      </div>
    </section>
  );
}
