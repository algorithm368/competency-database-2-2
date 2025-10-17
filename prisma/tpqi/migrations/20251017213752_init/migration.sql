-- CreateTable
CREATE TABLE "Sector" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SectorToBranch" (
    "branchId" INTEGER NOT NULL,
    "sectorId" INTEGER NOT NULL,

    PRIMARY KEY ("branchId", "sectorId"),
    CONSTRAINT "SectorToBranch_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SectorToBranch_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SectorToOccupation" (
    "occupationId" INTEGER NOT NULL,
    "sectorId" INTEGER NOT NULL,

    PRIMARY KEY ("occupationId", "sectorId"),
    CONSTRAINT "SectorToOccupation_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SectorToOccupation_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BranchToOccupation" (
    "branchId" INTEGER NOT NULL,
    "occupationId" INTEGER NOT NULL,

    PRIMARY KEY ("branchId", "occupationId"),
    CONSTRAINT "BranchToOccupation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BranchToOccupation_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Level" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "occupationId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Qualification_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Qualification_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Knowledge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "QualificationToUnit" (
    "qualificationId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    PRIMARY KEY ("qualificationId", "unitId"),
    CONSTRAINT "QualificationToUnit_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QualificationToUnit_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UnitToSkill" (
    "unitId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    PRIMARY KEY ("unitId", "skillId"),
    CONSTRAINT "UnitToSkill_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UnitToSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UnitToKnowledge" (
    "unitId" INTEGER NOT NULL,
    "knowledgeId" INTEGER NOT NULL,

    PRIMARY KEY ("unitId", "knowledgeId"),
    CONSTRAINT "UnitToKnowledge_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UnitToKnowledge_knowledgeId_fkey" FOREIGN KEY ("knowledgeId") REFERENCES "Knowledge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Sector_name_key" ON "Sector"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_key" ON "Branch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_name_key" ON "Occupation"("name");

-- CreateIndex
CREATE INDEX "SectorToOccupation_sectorId_idx" ON "SectorToOccupation"("sectorId");

-- CreateIndex
CREATE INDEX "SectorToOccupation_occupationId_idx" ON "SectorToOccupation"("occupationId");

-- CreateIndex
CREATE INDEX "BranchToOccupation_branchId_idx" ON "BranchToOccupation"("branchId");

-- CreateIndex
CREATE INDEX "BranchToOccupation_occupationId_idx" ON "BranchToOccupation"("occupationId");

-- CreateIndex
CREATE INDEX "Qualification_occupationId_idx" ON "Qualification"("occupationId");

-- CreateIndex
CREATE INDEX "Qualification_levelId_idx" ON "Qualification"("levelId");

-- CreateIndex
CREATE INDEX "QualificationToUnit_qualificationId_idx" ON "QualificationToUnit"("qualificationId");

-- CreateIndex
CREATE INDEX "QualificationToUnit_unitId_idx" ON "QualificationToUnit"("unitId");

-- CreateIndex
CREATE INDEX "UnitToSkill_unitId_idx" ON "UnitToSkill"("unitId");

-- CreateIndex
CREATE INDEX "UnitToSkill_skillId_idx" ON "UnitToSkill"("skillId");

-- CreateIndex
CREATE INDEX "UnitToKnowledge_unitId_idx" ON "UnitToKnowledge"("unitId");

-- CreateIndex
CREATE INDEX "UnitToKnowledge_knowledgeId_idx" ON "UnitToKnowledge"("knowledgeId");
