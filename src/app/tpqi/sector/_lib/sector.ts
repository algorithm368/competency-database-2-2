import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export interface Sector {
  id: number;
  name: string;
}

const dataPath = path.join(
  process.cwd(),
  "src/app/tpqi/sector/data/sectors.json",
);

export async function getSectors(): Promise<Sector[]> {
  try {
    const jsonData = await fs.readFile(dataPath, "utf-8");
    const sectors: Sector[] = JSON.parse(jsonData); // ใช้ type Sector ตรง ๆ

    return sectors.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Failed to fetch sectors:", error);
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
