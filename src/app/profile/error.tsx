"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

type ProfileErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ProfileError({ error, reset }: ProfileErrorProps) {
  useEffect(() => {
    console.error("Profile page error:", error);
  }, [error]);

  return (
    <div className="container max-w-3xl py-10">
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Something went wrong!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We encountered an error while loading your profile. Please try
            again.
          </p>
          {error.message && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded">
              {error.message}
            </p>
          )}
          <div className="flex gap-3">
            <Button onClick={reset}>Try Again</Button>
            <Button
              variant="outline"
              onClick={() => (globalThis.location.href = "/")}
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
