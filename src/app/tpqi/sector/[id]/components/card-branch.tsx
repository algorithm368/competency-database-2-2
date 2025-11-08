import Link from "next/link";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectorWithRelations } from "../../_lib/types";

interface CardBranchProps {
  readonly branches: SectorWithRelations["branches"];
}

export function CardBranch({ branches }: CardBranchProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Sub-branches ({branches?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {branches && branches.length > 0 ? (
          <ul className="space-y-2">
            {branches.map((sb: SectorWithRelations["branches"][number]) => (
              <li key={sb.branchId}>
                <Link
                  href={`/tpqi/branch/${sb.branchId}`}
                  className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors hover:shadow-sm"
                >
                  <span className="text-sm font-medium">{sb.branch.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No sub-branch data available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
