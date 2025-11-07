"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileInfoFormProps = Readonly<{
  name: string;
  email: string;
  phone: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  errors?: {
    name?: string[];
    phone?: string[];
  };
}>;

export function ProfileInfoForm({
  name,
  email,
  phone,
  onNameChange,
  onPhoneChange,
  errors,
}: ProfileInfoFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your full name"
          className={errors?.name ? "border-red-500" : ""}
        />
        {errors?.name && (
          <p className="text-sm text-red-500">{errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
          className="bg-muted cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="0XX-XXX-XXXX"
          className={errors?.phone ? "border-red-500" : ""}
        />
        {errors?.phone && (
          <p className="text-sm text-red-500">{errors.phone[0]}</p>
        )}
      </div>
    </div>
  );
}
