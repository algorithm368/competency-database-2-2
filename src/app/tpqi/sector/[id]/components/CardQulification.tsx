import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectorWithRelations } from "../../_lib/types";

interface CardQualificationProps {
  qualifications: SectorWithRelations["qualifications"];
}

export function CardQualification({
  qualifications,
}: CardQualificationProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          คุณวุฒิวิชาชีพ ({qualifications?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {qualifications && qualifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualifications.map((qual) => (
              <Link
                key={qual.id}
                href={`/tpqi/qualification/${qual.id}`}
                className="block p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow hover:border-primary/50"
              >
                <div className="space-y-2">
                  {qual.level && (
                    <Badge variant="outline" className="text-xs">
                      {qual.level.name}
                    </Badge>
                  )}
                  <div className="text-sm space-y-1">
                    {qual.branch && (
                      <p>
                        <span className="font-semibold">สาขา: </span>
                        {qual.branch.name}
                      </p>
                    )}
                    {qual.occupation && (
                      <p>
                        <span className="font-semibold">อาชีพ: </span>
                        {qual.occupation.name}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            ไม่มีข้อมูลคุณวุฒิวิชาชีพ
          </p>
        )}
      </CardContent>
    </Card>
  );
}
