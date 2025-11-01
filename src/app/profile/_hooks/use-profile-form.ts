"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "../_lib/actions";
import { UserWithRelations } from "../_lib/types";
import { toast } from "sonner";

export function useProfileForm(initialUser: UserWithRelations) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    name: initialUser.name,
    email: initialUser.email,
    phone: initialUser.phone || "",
    titleId: initialUser.titleId || "",
    street: initialUser.address?.street || "",
    subdistrict: initialUser.address?.subdistrict || "",
    district: initialUser.address?.district || "",
    province: initialUser.address?.province || "",
    postalCode: initialUser.address?.postalCode || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const hasAddress =
      formData.street ||
      formData.subdistrict ||
      formData.district ||
      formData.province ||
      formData.postalCode;

    startTransition(async () => {
      const result = await updateProfile({
        name: formData.name,
        phone: formData.phone || null,
        titleId: formData.titleId || null,
        address: hasAddress
          ? {
              street: formData.street,
              subdistrict: formData.subdistrict,
              district: formData.district,
              province: formData.province,
              postalCode: formData.postalCode,
            }
          : null,
      });

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    });
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
    isPending,
    errors,
  };
}
