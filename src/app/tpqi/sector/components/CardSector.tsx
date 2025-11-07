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
