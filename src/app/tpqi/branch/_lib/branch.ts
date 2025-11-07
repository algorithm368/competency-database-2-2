import { parse } from "csv-parse/sync";
import fs from "node:fs/promises";
import path from "node:path";
import { tpqiPrisma } from "@/lib/prisma-tpqi";

interface Branch {
  id: number;
  name: string;
}

interface BranchCSV {
  id: string;
  name: string;
}

const dataPath: string = path.join(
  process.cwd(),
  "prisma/tpqi/seed/data/Branch.csv",
);

export async function getBranch(): Promise<Branch[]> {
  try {
    // Get CSV Data from file
    const csvData: string = await fs.readFile(dataPath, "utf-8");

    const record: BranchCSV[] = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    const branchs: Branch[] = record.map((r: BranchCSV) => ({
      id: Number(r.id),
      name: r.name,
    }));

    return branchs.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {}
  throw new Error();
}

export async function getBranchById(id: number) {
  try {
    return await tpqiPrisma.branch.findUnique({
      where: { id },
      include: {
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
    console.error(`Failed to fetch branch with id ${id}:`, error);
    throw new Error("Failed to fetch branch sector by id");
  }
}
