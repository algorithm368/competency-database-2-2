"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileAddressFormProps } from "../_lib/types";

export function ProfileAddressForm({
  street,
  subdistrict,
  district,
  province,
  postalCode,
  onStreetChange,
  onSubdistrictChange,
  onDistrictChange,
  onProvinceChange,
  onPostalCodeChange,
  errors,
}: ProfileAddressFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Address Information</h3>

      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          type="text"
          value={street}
          onChange={(e) => onStreetChange(e.target.value)}
          placeholder="123 Main St"
          className={errors?.street ? "border-red-500" : ""}
        />
        {errors?.street && (
          <p className="text-sm text-red-500">{errors.street[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subdistrict">Subdistrict</Label>
          <Input
            id="subdistrict"
            type="text"
            value={subdistrict}
            onChange={(e) => onSubdistrictChange(e.target.value)}
            placeholder="Subdistrict"
            className={errors?.subdistrict ? "border-red-500" : ""}
          />
          {errors?.subdistrict && (
            <p className="text-sm text-red-500">{errors.subdistrict[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input
            id="district"
            type="text"
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            placeholder="District"
            className={errors?.district ? "border-red-500" : ""}
          />
          {errors?.district && (
            <p className="text-sm text-red-500">{errors.district[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Input
            id="province"
            type="text"
            value={province}
            onChange={(e) => onProvinceChange(e.target.value)}
            placeholder="Province"
            className={errors?.province ? "border-red-500" : ""}
          />
          {errors?.province && (
            <p className="text-sm text-red-500">{errors.province[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            type="text"
            value={postalCode}
            onChange={(e) => onPostalCodeChange(e.target.value)}
            placeholder="12345"
            maxLength={5}
            className={errors?.postalCode ? "border-red-500" : ""}
          />
          {errors?.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
}
