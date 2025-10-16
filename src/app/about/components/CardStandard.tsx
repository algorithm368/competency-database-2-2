import { Badge } from "@/components/ui/badge";
import { type StandardProps } from "@/app/about/data/standardData";

export default function CardStandard({
  item,
}: Readonly<{ item: StandardProps }>) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${item.label} standard (opens in a new tab)`}
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm p-0 overflow-hidden focus:outline-none focus-visible:ring-ring/50 focus-visible:ring-2"
    >
      <div className="px-6 pt-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg text-primary font-semibold">{item.label}</h3>
          <p className="mt-1 text-sm text-primary">{item.description}</p>
        </div>

        <div className="ml-4 self-start">
          <span className="inline-flex">
            <Badge variant="outline">Standard</Badge>
          </span>
        </div>
      </div>

      <div className="px-6 pb-4 text-sm text-muted-foreground"></div>
    </a>
  );
}
