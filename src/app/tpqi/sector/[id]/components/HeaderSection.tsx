import { Badge } from "@/components/ui/badge";
import type { CategoryInfo } from "../../_lib/types";

interface SectorHeaderProps {
  name: string;
  categoryInfo: CategoryInfo;
}

export function SectorHeader({ name, categoryInfo }: SectorHeaderProps) {
  return (
    <header className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={categoryInfo.variant} className="text-sm px-3 py-1">
          {categoryInfo.type}
        </Badge>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {name}
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground">
        รายละเอียดข้อมูลสาขาวิชาชีพและคุณวุฒิที่เกี่ยวข้อง
      </p>
    </header>
  );
}
