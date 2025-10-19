// src/app/tpqi/sector/_lib/sector.ts
import prisma from "@/lib/prisma";

export interface Sector {
  id: number;
  name: string;
}

export async function getSectors(): Promise<Sector[]> {
  try {
    return await prisma.sector.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
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
