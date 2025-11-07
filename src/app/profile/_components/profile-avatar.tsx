"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  name: string;
  image?: string | null;
}

export function ProfileAvatar({ name, image }: ProfileAvatarProps) {
  console.log(image);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className="h-20 w-20">
      {image ? (
        <AvatarImage src={image} alt={name} />
      ) : (
        <AvatarFallback className="text-xl">{initials}</AvatarFallback>
      )}
    </Avatar>
  );
}
