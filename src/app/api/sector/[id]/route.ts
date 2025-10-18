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
        qualifications: true,
      },
    });

    if (!sector) {
      return NextResponse.json({ error: "Sector not found" }, { status: 404 });
    }

    return NextResponse.json(sector);
  } catch (err: any) {
    console.error("Error fetching sector:", err.message);
    const status = err.message.startsWith("Invalid") ? 400 : 500;
    return NextResponse.json({ error: err.message }, { status });
  }
}
