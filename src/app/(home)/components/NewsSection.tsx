"use client";

import {
  CheckCircle,
  Database,
  RefreshCw,
  Server,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const iconMap: Record<string, LucideIcon> = {
  RefreshCw,
  Database,
  Server,
};

interface NewsFeature {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

interface WhatsNewsSectionProps {
  readonly features: NewsFeature[];
}

export function WhatsNewsSection({ features }: WhatsNewsSectionProps) {
  const router = useRouter();
  const navigateToResults = () => router.push("/results");

  return (
    <section id="version-2-features" className="relative py-20">
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <Badge variant="secondary" className="mb-4 inline-flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 inline" />
            Version 2.0 Now Available
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left">
            What&apos;s New in Version 2
          </h2>

          <p className="text-lg max-w-2xl mb-16 text-left">
            Major improvements and new features that make competency assessment
            more efficient and comprehensive than ever before.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 justify-start">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <Card
                key={feature.title}
                className="backdrop-blur-sm hover:shadow-xl p-6 text-left"
              >
                <CardHeader>
                  <div className="mb-6">
                    <Icon className="w-8 h-8 text-foreground text-2xl" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16">
          <Card className="backdrop-blur-sm hover:shadow-lg p-8 text-left">
            <CardContent>
              <h3 className="text-2xl font-bold mb-4">
                Ready to Experience the New Platform?
              </h3>
              <p className="mb-6 max-w-2xl leading-relaxed">
                Version 2 is a complete upgrade of the competency assessment
                platform with diverse competency frameworks, comprehensive
                database, and modern architecture. You now have the most
                powerful tool for competency assessment at your fingertips.
              </p>
              <Button
                onClick={navigateToResults}
                className="text-white px-6 py-3 rounded-md shadow"
                size="lg"
              >
                Start Exploring Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
