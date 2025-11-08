import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Detail {
  id: number;
  content: string;
}

interface Level {
  levelId: number;
  levelName: string;
  details: Detail[];
}

interface CardLevelProps {
  level: Level;
}

export function CardLevel({ level }: CardLevelProps) {
  return (
    <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow mx-4 sm:px-6">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-semibold flex justify-between py-2">
          {level.levelName}{" "}
          <span className="text-sm text-muted-foreground">
            #{level.levelId}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-0 py-2">
        {level.details.length > 0 ? (
          level.details.map((d) => (
            <p key={d.id} className="text-sm text-muted-foreground">
              • {d.content}
            </p>
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No details available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
