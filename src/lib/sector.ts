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
