"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserData {
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
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch user");
        } else {
          setUser(data);
        }
      } catch (err) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!user) return null;

  function handleChange(
    field: keyof UserData | keyof NonNullable<UserData["address"]>,
    value: string,
  ) {
    if (field in user) {
      setUser({ ...user, [field]: value } as UserData);
    } else if (user.address && field in user.address) {
      setUser({
        ...user,
        address: { ...user.address, [field]: value },
      });
    }
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
      alert("Profile updated!");
    } catch (err) {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              {user.image ? (
                <AvatarImage src={user.image} />
              ) : (
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <Label className="block mb-1">Name</Label>
                <Input
                  value={user.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("name", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="block mb-1">Email</Label>
                <Input
                  value={user.email}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {user.title && (
            <div>
              <Label className="block mb-1">Title</Label>
              <Input value={user.title.name} disabled className="bg-gray-100" />
            </div>
          )}

          <div>
            <Label className="block mb-1">Phone</Label>
            <Input
              value={user.phone || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("phone", e.target.value)
              }
            />
          </div>

          {user.address && (
            <div className="space-y-4">
              <div>
                <Label className="block mb-1">Street</Label>
                <Input
                  value={user.address.street}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("street", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="block mb-1">Subdistrict</Label>
                <Input
                  value={user.address.subdistrict}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("subdistrict", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="block mb-1">District</Label>
                <Input
                  value={user.address.district}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("district", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="block mb-1">Province</Label>
                <Input
                  value={user.address.province}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("province", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="block mb-1">Postal Code</Label>
                <Input
                  value={user.address.postalCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("postalCode", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <Button className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
