import { Target, User, BarChart3, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
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
