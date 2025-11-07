import { User, Address } from ".prisma/auth/client";

export interface UserWithRelations extends User {
  address: Address | null;
}

export interface UpdateUserInput {
  name: string;
  phone?: string | null;
  address?: AddressInput | null;
}

export interface AddressInput {
  street: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
}

export interface ProfileFormData extends AddressInput {
  name: string;
  email: string;
  phone: string;
}

export type ProfileAddressFormProps = Readonly<{
  street: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;

  onStreetChange: (value: string) => void;
  onSubdistrictChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onPostalCodeChange: (value: string) => void;

  errors?: Partial<Record<keyof AddressInput, string[]>>;
}>;
