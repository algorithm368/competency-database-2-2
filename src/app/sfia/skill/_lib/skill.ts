import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { sfiaPrisma } from "@/lib/prisma-sfia";

interface Skill {
  id: number;
  code: string;
  name: string;
}

interface SkillCsv {
  id: string;
  code: string;
  name: string;
}

const dataPath = path.join(process.cwd(), "prisma/sfia/seeds/skill.csv");

export async function getSkills(): Promise<Skill[]> {
  try {
    const csvData = await fs.readFile(dataPath, "utf-8");

    const records: SkillCsv[] = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    const skills = records.map((r) => ({
      id: Number(r.id),
      code: r.code,
      name: r.name,
    }));

    return skills.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Failed to fetch skills from CSV:", error);
    throw new Error("Failed to fetch skills");
  }
}

export async function getSkillById(id: number) {
  try {
    return await sfiaPrisma.skill.findUnique({
      where: { id: id },
      include: {
        subCategory: {
          include: { category: true },
        },
        levels: {
          include: {
            level: true,
            details: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to skill sector with id ${id}:`, error);
    throw new Error("Failed to skill sector by id");
  }
}
