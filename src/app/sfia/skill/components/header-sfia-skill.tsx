import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HeaderSkillProps {
  readonly name: string;
  readonly code: string;
  readonly category: string;
  readonly subCategory: string;
}

export function HeaderSkill({
  name,
  code,
  category,
  subCategory,
}: HeaderSkillProps) {
  return (
    <Card className="border-none shadow-none mb-8">
      <CardHeader className="space-y-3">
        {/* Title and Code */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">
            {name}
          </CardTitle>
          <Badge variant="secondary" className="text-sm font-mono">
            {code}
          </Badge>
        </div>

        {/* Category Info */}
        <div className="space-y-1">
          <CardDescription className="text-base sm:text-lg text-muted-foreground">
            {category}
          </CardDescription>
          <p className="text-sm sm:text-base text-muted-foreground/80">
            {subCategory}
          </p>
        </div>
      </CardHeader>

      {/* Optional Divider Section */}
      <div className="border-t border-border mx-6" />
    </Card>
  );
}
