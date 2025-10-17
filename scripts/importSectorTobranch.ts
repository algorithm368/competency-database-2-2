import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // load .env

const prisma = new PrismaClient();

async function main() {
  const relations: { sectorId: number; branchId: number }[] = [];

  fs.createReadStream("scripts/data/sectorToBranch.csv") // your CSV path
    .pipe(csv())
    .on("data", (row) => {
      relations.push({
        sectorId: Number(row.sector_id),
        branchId: Number(row.branch_id),
      });
    })
    .on("end", async () => {
      try {
        console.log(
          `Read ${relations.length} sector-branch relations from CSV`
        );

        for (const rel of relations) {
          await prisma.sectorToBranch.upsert({
            where: {
              sectorId_branchId: {
                sectorId: rel.sectorId,
                branchId: rel.branchId,
              },
            },
            update: {}, // do nothing if exists
            create: {
              sectorId: rel.sectorId,
              branchId: rel.branchId,
            },
          });
          console.log(
            `Inserted/Updated relation: Sector ${rel.sectorId} -> Branch ${rel.branchId}`
          );
        }

        console.log("All sector-branch relations imported successfully!");
      } catch (err) {
        console.error("Error inserting relations:", err);
      } finally {
        await prisma.$disconnect();
      }
    });
}

main().catch(async (err) => {
  console.error("Unexpected error:", err);
  await prisma.$disconnect();
});
