import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSectors, getSectorById } from "../_lib/sector";
import { SectorHeader } from "./components/HeaderSection";
import { CardBranch } from "./components/CardBranch";
import { CardOccupation } from "./components/CardOccupation";
import { CardQualification } from "./components/CardQualification";

interface SectorPageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { id: idParam } = await params;
  // Validate id from params
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id) || id <= 0) {
    notFound();
  }

  // Query database safely
  const sector = await getSectorById(id);

  // Handle missing result
  if (!sector) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/tpqi/sector" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            กลับไปยังรายการสาขา
          </Link>
        </Button>

        {/* Header Section */}
        <SectorHeader name={sector.name} />

        <Separator className="my-8" />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardBranch branches={sector.branches} />
          <CardOccupation occupations={sector.occupations} />
        </div>

        {/* Qualifications Section - Full Width */}
        <CardQualification qualifications={sector.qualifications} />
      </div>
    </main>
  );
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const sectors = await getSectors();

  return sectors.map((sector) => ({
    id: sector.id.toString(),
  }));
}
