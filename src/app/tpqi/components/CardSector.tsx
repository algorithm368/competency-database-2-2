import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type CardSectorProps = {
  id: number;
  name: string;
  className?: string;
  onClick?: (id: number) => void;
};

const CardSector = ({ id, name, className, onClick }: CardSectorProps) => {
  const idStr = String(id);

  // Extract category prefix for visual hierarchy
  const getCategoryBadge = (name: string) => {
    if (name.startsWith("สมรรถนะสนับสนุนการทำงานด้าน")) {
      return {
        type: "สมรรถนะ",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      };
    }
    if (name.startsWith("สาขาวิชาชีพ")) {
      return {
        type: "สาขาวิชาชีพ",
        color:
          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      };
    }
    return null;
  };

  const categoryBadge = getCategoryBadge(name);

  // Shorten display name by removing common prefix
  const getDisplayName = (name: string) => {
    if (name.startsWith("สมรรถนะสนับสนุนการทำงานด้าน")) {
      return name.replace("สมรรถนะสนับสนุนการทำงานด้าน", "");
    }
    if (name.startsWith("สาขาวิชาชีพ")) {
      return name.replace("สาขาวิชาชีพ", "");
    }
    return name;
  };

  const displayName = getDisplayName(name);

  const cardContent = (
    <Card className="h-full transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:border-primary/50 cursor-pointer group">
      <CardHeader className="space-y-3">
        {categoryBadge && (
          <span
            className={cn(
              "inline-block w-fit px-2 py-1 rounded-md text-xs font-medium",
              categoryBadge.color
            )}
          >
            {categoryBadge.type}
          </span>
        )}
        <CardTitle
          className="text-base leading-relaxed line-clamp-4 group-hover:text-primary transition-colors"
          title={name}
        >
          {displayName}
        </CardTitle>
      </CardHeader>
    </Card>
  );

  const wrapperClass = cn("block h-full", className);

  return onClick ? (
    <button className={wrapperClass} onClick={() => onClick(id)}>
      {cardContent}
    </button>
  ) : (
    <Link href={`/tpqi/sector/${idStr}`} className={wrapperClass}>
      {cardContent}
    </Link>
  );
};

export default CardSector;
