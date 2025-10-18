import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const idNum = Number(id);

  if (Number.isNaN(idNum)) {
    return NextResponse.json(
      { error: "Invalid occupation ID" },
      { status: 400 }
    );
  }

  try {
    const occupation = await prisma.occupation.findUnique({
      where: { id: idNum },
      include: {
        qualifications: true,
        sectorToOccupation: { include: { sector: true } },
        branchToOccupations: { include: { branch: true } },
      },
    });

    if (!occupation) {
      return NextResponse.json(
        { error: "Occupation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(occupation);
  } catch (err) {
    console.error("Error fetching occupation:", err);
    return NextResponse.json(
      { error: "Failed to fetch occupation" },
      { status: 500 }
    );
  }
}
