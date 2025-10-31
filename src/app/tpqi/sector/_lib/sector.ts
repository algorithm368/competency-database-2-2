import prisma from "@/lib/tpqi-client";
import fs from "fs/promises";
import path from "path";
import { parse } from "csv-parse/sync";

interface Sector {
  id: number;
  name: string;
}

interface SectorCSV {
  id: string;
  name: string;
}

const dataPath = path.join(process.cwd(), "prisma/tpqi/seed/data/Sector.csv");

export async function getSectors(): Promise<Sector[]> {
  try {
    const csvData = await fs.readFile(dataPath, "utf-8");

    const records: SectorCSV[] = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    // แปลง string id เป็น number
    const sectors: Sector[] = records.map((r) => ({
      id: Number(r.id),
      name: r.name,
    }));

    return sectors.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Failed to fetch sectors from CSV:", error);
    throw new Error("Failed to fetch sectors");
  }
}

export async function getSectorById(id: number) {
  try {
    return await prisma.sector.findUnique({
      where: { id },
      include: {
        branches: {
          include: { branch: true },
          orderBy: { branch: { name: "asc" } },
        },
        occupations: {
          include: { occupation: true },
          orderBy: { occupation: { name: "asc" } },
        },
        qualifications: {
          include: {
            level: true,
            branch: true,
            occupation: true,
          },
          orderBy: { id: "asc" },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to fetch sector with id ${id}:`, error);
    throw new Error("Failed to fetch sector by id");
  }
}
