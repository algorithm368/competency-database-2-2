// src/app/tpqi/page.tsx
import CardSector from "./components/CardSector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSectors } from "@/lib/sector";

interface TpqiPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CATEGORY_CONFIG = {
  all: {
    label: "ทั้งหมด",
    filter: (sectors: Sector[]) => sectors,
  },
  competency: {
    label: "สมรรถนะสนับสนุน",
    filter: (sectors: Sector[]) =>
      sectors.filter((s) => s.name.startsWith("สมรรถนะสนับสนุน")),
  },
  professional: {
    label: "สาขาวิชาชีพ",
    filter: (sectors: Sector[]) =>
      sectors.filter((s) => s.name.startsWith("สาขาวิชาชีพ")),
  },
} as const;

interface Sector {
  id: number;
  name: string;
}

export default async function TpqiPage({ searchParams }: TpqiPageProps) {
  const params = await searchParams;

  const search = Array.isArray(params.search)
    ? params.search[0]
    : params.search || "";
  const category =
    (Array.isArray(params.category) ? params.category[0] : params.category) ||
    "all";

  const sectors = await getSectors();

  const filteredSectors = CATEGORY_CONFIG[
    category as keyof typeof CATEGORY_CONFIG
  ]
    .filter(sectors)
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 sm:mb-12 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            TPQI Framework
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            Thailand Professional Qualification Institute
          </p>
        </header>

        {/* Search Form */}
        <form method="get" className="mb-6 flex flex-col sm:flex-row gap-2">
          <Input
            name="search"
            placeholder="ค้นหาสาขา... (เช่น การเงิน, ดิจิทัล, โรงแรม)"
            defaultValue={search}
            className="flex-1"
          />
          <input type="hidden" name="category" value={category} />
          <Button type="submit" className="whitespace-nowrap">
            Search
          </Button>
        </form>

        {/* Category Badges */}
        <div className="mb-8 flex flex-wrap gap-2">
          {Object.entries(CATEGORY_CONFIG).map(([key, { label, filter }]) => {
            const isActive = category === key;
            const count = filter(sectors).length;

            return (
              <Badge
                key={key}
                variant={isActive ? "default" : "outline"}
                asChild
              >
                <a
                  href={`?category=${key}&search=${encodeURIComponent(search)}`}
                >
                  {label} ({count})
                </a>
              </Badge>
            );
          })}
        </div>

        {/* Results */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
              {CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG].label}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredSectors.length}{" "}
              {filteredSectors.length === 1 ? "sector" : "sectors"}
            </span>
          </div>

          {filteredSectors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">ไม่พบข้อมูลที่ค้นหา</p>
              <p className="text-sm mt-2">
                ลองใช้คำค้นหาอื่น หรือเลือกหมวดหมู่ทั้งหมด
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
              {filteredSectors.map((sector) => (
                <CardSector key={sector.id} id={sector.id} name={sector.name} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
