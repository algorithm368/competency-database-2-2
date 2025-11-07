"use client";

import { useProfileForm } from "../_hooks/use-profile-form";
import { ProfileInfoForm } from "./profile-info-form";
import { ProfileAddressForm } from "./profile-address-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserWithRelations } from "../_lib/types";

export function ProfileFormClient({
  user,
}: Readonly<{ user: UserWithRelations }>) {
  const { formData, updateField, handleSubmit, isPending, errors } =
    useProfileForm(user);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfileInfoForm
        name={formData.name}
        email={formData.email}
        phone={formData.phone}
        onNameChange={(value) => updateField("name", value)}
        onPhoneChange={(value) => updateField("phone", value)}
        errors={errors}
      />

      <Separator />

      <ProfileAddressForm
        street={formData.street}
        subdistrict={formData.subdistrict}
        district={formData.district}
        province={formData.province}
        postalCode={formData.postalCode}
        onStreetChange={(value) => updateField("street", value)}
        onSubdistrictChange={(value) => updateField("subdistrict", value)}
        onDistrictChange={(value) => updateField("district", value)}
        onProvinceChange={(value) => updateField("province", value)}
        onPostalCodeChange={(value) => updateField("postalCode", value)}
        errors={errors}
      />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => globalThis.location.reload()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
