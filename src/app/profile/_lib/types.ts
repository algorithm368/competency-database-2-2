import { User, Address } from ".prisma/auth/client";

export type UserWithRelations = User & {
  address: Address | null;
};

export type UpdateUserInput = {
  name: string;
  phone?: string | null;
  titleId?: string | null;
  address?: {
    street: string;
    subdistrict: string;
    district: string;
    province: string;
    postalCode: string;
  } | null;
};

export type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  titleId: string;
  street: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
};
