import { Prisma } from "@/lib/prisma-tpqi";

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

export interface Sector {
  id: number;
  name: string;
}

export interface SectorPageParams {
  id: string;
}

export interface TpqiPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
