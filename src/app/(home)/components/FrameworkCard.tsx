import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Globe, Award, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Award,
};

interface Framework {
  readonly framework: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly features: readonly string[];
  readonly variant: "blue" | "emerald";
}

interface FrameworkCardProps {
  readonly framework: Framework;
  readonly index: number;
}

export function FrameworkCard({ framework, index }: FrameworkCardProps) {
  const Icon = iconMap[framework.icon];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-[transparent] backdrop-blur-sm hover:-translate-y-1">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl group-hover:scale-110 transition-transform duration-300 border-3 border-foreground">
              <Icon className="w-6 h-6 text-foreground" />
            </div>
            <Badge>{framework.framework}</Badge>
          </div>
          <CardTitle className="text-lg text-left">{framework.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-left">{framework.description}</p>
          <Separator />
          <div className="space-y-2">
            {framework.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm animated-entry"
              >
                <div />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
