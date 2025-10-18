/*
  Warnings:

  - You are about to drop the `BranchToOccupation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QualificationToUnit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectorToBranch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectorToOccupation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitToKnowledge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitToSkill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Knowledge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[occupationId,levelId,name]` on the table `Qualification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BranchToOccupation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QualificationToUnit";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SectorToBranch";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SectorToOccupation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UnitToKnowledge";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UnitToSkill";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SectorBranch" (
    "sectorId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,

    PRIMARY KEY ("sectorId", "branchId"),
    CONSTRAINT "SectorBranch_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SectorBranch_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SectorOccupation" (
    "sectorId" INTEGER NOT NULL,
    "occupationId" INTEGER NOT NULL,

    PRIMARY KEY ("sectorId", "occupationId"),
    CONSTRAINT "SectorOccupation_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SectorOccupation_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BranchOccupation" (
    "branchId" INTEGER NOT NULL,
    "occupationId" INTEGER NOT NULL,

    PRIMARY KEY ("branchId", "occupationId"),
    CONSTRAINT "BranchOccupation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BranchOccupation_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OccupationLevel" (
    "occupationId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,

    PRIMARY KEY ("occupationId", "levelId"),
    CONSTRAINT "OccupationLevel_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OccupationLevel_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QualificationUnit" (
    "qualificationId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    PRIMARY KEY ("qualificationId", "unitId"),
    CONSTRAINT "QualificationUnit_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QualificationUnit_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UnitSkill" (
    "unitId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    PRIMARY KEY ("unitId", "skillId"),
    CONSTRAINT "UnitSkill_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UnitSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UnitKnowledge" (
    "unitId" INTEGER NOT NULL,
    "knowledgeId" INTEGER NOT NULL,

    PRIMARY KEY ("unitId", "knowledgeId"),
    CONSTRAINT "UnitKnowledge_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UnitKnowledge_knowledgeId_fkey" FOREIGN KEY ("knowledgeId") REFERENCES "Knowledge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Knowledge_name_key" ON "Knowledge"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_occupationId_levelId_name_key" ON "Qualification"("occupationId", "levelId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");
