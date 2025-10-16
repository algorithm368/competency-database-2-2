"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  Database,
  Server,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, LucideIcon> = {
  RefreshCw,
  Database,
  Server,
};

interface NewsFeature {
  icon: string;
  title: string;
  description: string;
}

interface WhatsNewsSectionProps {
  features: NewsFeature[];
}

export function WhatsNewsSection({ features }: WhatsNewsSectionProps) {
  const [inView, setInView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const element = document.getElementById("version-2-features");
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const navigateToResults = () => router.push("/results");

  return (
    <section id="version-2-features" className="relative py-20">
      <div className="relative max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="secondary" className="mb-4 animate-pulse">
            <CheckCircle className="w-4 h-4 mr-2" />
            Version 2.0 Now Available
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What's New in Version 2
          </h2>

          <p className="text-lg max-w-2xl mx-auto">
            Major improvements and new features that make competency assessment
            more efficient and comprehensive than ever before.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];

            return (
              <div
                key={feature.title}
                className={`transition-all duration-700 ${
                  inView
                    ? "opacity-100 translate-y-0 translate-x-0"
                    : "opacity-0 translate-y-8 -translate-x-5"
                }`}
              >
                <Card className="relative group h-full hover:shadow-xl transition-all duration-300 backdrop-blur-sm hover:-translate-y-2">
                  <CardHeader>
                    <div className="mb-6">
                      <Icon className="w-8 h-8 text-foreground text-2xl" />
                    </div>

                    <CardTitle className="group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-16 transition-all duration-700">
          <Card className="backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Experience the New Platform?
              </h3>
              <p className="mb-6 max-w-2xl mx-auto leading-relaxed">
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
