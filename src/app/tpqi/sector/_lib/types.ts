import Prisma from "@/lib/prisma-tpqi";

export type SectorWithRelations = Prisma.SectorGetPayload<{
  include: {
    branches: {
      include: { branch: true };
    };
    occupations: {
      include: { occupation: true };
    };
    qualifications: {
      include: {
        level: true;
        branch: true;
        occupation: true;
      };
    };
  };
}>;

export interface SectorPageParams {
  id: string;
}

export type CategoryVariant = "default" | "secondary" | "outline";

export interface CategoryInfo {
  type: string;
  variant: CategoryVariant;
}
