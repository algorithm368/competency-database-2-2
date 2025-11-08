import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectorWithRelations } from "../../_lib/types";

interface CardOccupationProps {
  readonly occupations: SectorWithRelations["occupations"];
}

export function CardOccupation({ occupations }: CardOccupationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          Related Occupations ({occupations?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {occupations && occupations.length > 0 ? (
          <ul className="space-y-2">
            {occupations.map(
              (so: CardOccupationProps["occupations"][number]) => (
                <li key={so.occupationId}>
                  <Link
                    href={`/tpqi/occupation/${so.occupationId}`}
                    className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors hover:shadow-sm"
                  >
                    <span className="text-sm font-medium">
                      {so.occupation.name}
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No related occupation data available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
