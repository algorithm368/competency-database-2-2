import { Feature } from "../data/featureData";
import { Card } from "@/components/ui/card";

export default function CardFeature({
  feature,
}: Readonly<{ feature: Feature }>) {
  const Icon = feature.icon;
  return (
    <Card className="p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-primary mb-1">{feature.title}</h3>
          <p className="text-primary text-sm">{feature.description}</p>
        </div>
      </div>
    </Card>
  );
}
