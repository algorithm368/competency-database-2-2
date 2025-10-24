import prisma from "@/lib/prisma";

export async function getOccupationById(id: number) {
  try {
    return await prisma.occupation.findUnique({
      where: { id },
      include: {
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
    console.error(`Failed to fetch occupation with id ${id}:`, error);
    throw new Error(`Failed to fetch occupation by id`);
  }
}
