import Fuse from "fuse.js";
import { Search } from "lucide-react";
import CardSector from "./components/CardSector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSectors } from "@/app/tpqi/sector/_lib/sector";

interface TpqiPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Sector {
  id: number;
  name: string;
}

// Simple in-memory cache to avoid rebuilding Fuse for every request
let fuseCache: Fuse<Sector> | null = null;
let sectorCache: Sector[] | null = null;

export default async function SectorPage({
  searchParams,
}: Readonly<TpqiPageProps>) {
  const params = await searchParams;

  const search =
    typeof params.search === "string"
      ? params.search
      : Array.isArray(params.search)
        ? params.search[0]
        : "";

  if (!sectorCache) {
    sectorCache = await getSectors();
    fuseCache = new Fuse(sectorCache, {
      keys: ["name"],
      threshold: 0.4,
      distance: 100,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }

  const filteredSectors = !search.trim()
    ? sectorCache
    : fuseCache!.search(search).map((r) => r.item);

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-12 space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            TPQI Framework
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto sm:mx-0">
            Thailand Professional Qualification Institute
          </p>
        </header>

        <form
          method="get"
          className="mb-6 flex flex-row flex-wrap gap-3 items-center"
        >
          <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary z-10" />
            <Input
              name="search"
              defaultValue={search}
              placeholder="ค้นหาสาขาวิชาชีพที่คุณสนใจ... (เช่น การเงิน, เทคโนโลยี, โรงแรม)"
              className="pl-12 h-14 text-lg rounded-xl shadow-md backdrop-blur-sm bg-background/80 focus:ring-2 focus:ring-primary transition-all duration-300 w-full"
            />
          </div>
          <Button
            type="submit"
            className="h-14 px-6 sm:px-8 rounded-xl shadow-md text-lg hover:scale-105 transition-transform duration-200 shrink-0"
          >
            Search
          </Button>
        </form>

        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
              ทั้งหมด
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
                ลองใช้คำค้นหาอื่น หรือเว้นว่างช่องค้นหา
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
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
