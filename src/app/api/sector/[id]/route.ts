import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const parseId = (id: string, entityName: string) => {
  const num = Number(id);
  if (Number.isNaN(num) || num <= 0) {
    throw new Error(`Invalid ${entityName} ID`);
  }
  return num;
};

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: Params) {
  try {
    const { id } = await context.params;
    const sectorId = parseId(id, "sector");

    const sector = await prisma.sector.findUnique({
      where: { id: sectorId },
      include: {
        branches: { include: { branch: true } },
        occupations: { include: { occupation: true } },
        qualifications: { include: { level: true, branch: true } },
      },
    });

    if (!sector) {
      return NextResponse.json({ error: "Sector not found" }, { status: 404 });
    }

    // Convert branches
    const branches = sector.branches.map((item) => ({
      id: item.branch.id,
      name: item.branch.name,
    }));

    // Prepare occupations with levels and branches
    const levelsByOccupation: Record<number, any[]> = {};
    const branchesByOccupation: Record<number, number | null> = {};

    for (const qual of sector.qualifications) {
      if (!qual.occupationId || !qual.level) continue;

      if (!levelsByOccupation[qual.occupationId]) {
        levelsByOccupation[qual.occupationId] = [];
      }

      const exists = levelsByOccupation[qual.occupationId].some(
        (l) => l.levelId === qual.levelId,
      );

      if (!exists) {
        levelsByOccupation[qual.occupationId].push({
          levelId: qual.levelId,
          levelName: qual.level.name,
        });
      }

      if (qual.branchId) {
        branchesByOccupation[qual.occupationId] = qual.branchId;
      }
    }

    const occupations = sector.occupations.map((item) => ({
      id: item.occupation.id,
      name: item.occupation.name,
      branch: branchesByOccupation[item.occupationId] || null,
      levels: levelsByOccupation[item.occupationId] || [],
    }));

    // Include all qualifications directly
    const qualifications = sector.qualifications.map((q) => ({
      id: q.id,
      occupationId: q.occupationId,
      branchId: q.branchId,
      levelId: q.levelId,
      levelName: q.level?.name || null,
    }));

    return NextResponse.json({
      id: sector.id,
      name: sector.name,
      branches,
      occupations,
      qualifications,
    });
  } catch (error: any) {
    console.error("Error fetching sector:", error.message);
    const status = error.message.startsWith("Invalid") ? 400 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
