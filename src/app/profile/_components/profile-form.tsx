"use client";

import { useState, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserWithRelations } from "../_lib/types";

type UserData = Readonly<{
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  image?: string | null;
  title?: { id: string; name: string } | null;
  address?: {
    street: string;
    subdistrict: string;
    district: string;
    province: string;
    postalCode: string;
  } | null;
}>;

export default function ProfileForm({
  initialUser,
}: {
  initialUser: UserWithRelations;
}) {
  const [user, setUser] = useState<UserData>(initialUser);
  const [saving, setSaving] = useState(false);

  function handleChange(field: keyof UserData, value: string) {
    setUser((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Failed to save");
      alert("Profile updated");
    } catch {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          {user.image ? (
            <AvatarImage src={user.image} />
          ) : (
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1">
          <Label>Name</Label>
          <Input
            value={user.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("name", e.target.value)
            }
          />

          <Label className="mt-3 block">Email</Label>
          <Input value={user.email} disabled className="bg-gray-100" />
        </div>
      </div>

      <div>
        <Label>Phone</Label>
        <Input
          value={user.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
