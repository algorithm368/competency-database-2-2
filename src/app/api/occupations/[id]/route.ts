import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helpers
const mapEntity = (arr: any[], key: string) =>
  arr.map((item) => ({ id: item[key].id, name: item[key].name }));

const mapQualifications = (quals: any[]) =>
  quals.map((q) => ({
    id: q.id,
    name: q.name,
    levelId: q.levelId,
    occupationId: q.occupationId,
    units: q.units.map((u: any) => ({
      id: u.unit.id,
      code: u.unit.code,
      name: u.unit.name,
      description: u.unit.description,
    })),
  }));

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
    const occupationId = parseId(id, "occupation");

    const occupation = await prisma.occupation.findUnique({
      where: { id: occupationId },
      include: {
        qualifications: { include: { units: { include: { unit: true } } } },
        sectors: { include: { sector: true } },
        branches: { include: { branch: true } },
        levels: { include: { level: true } },
      },
    });

    if (!occupation) {
      return NextResponse.json(
        { error: "Occupation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: occupation.id,
      name: occupation.name,
      qualifications: mapQualifications(occupation.qualifications),
      sectors: mapEntity(occupation.sectors, "sector"),
      branches: mapEntity(occupation.branches, "branch"),
      levels: mapEntity(occupation.levels, "level"),
    });
  } catch (err: any) {
    console.error("Error fetching occupation:", err.message);
    const status = err.message.startsWith("Invalid") ? 400 : 500;
    return NextResponse.json({ error: err.message }, { status });
  }
}
