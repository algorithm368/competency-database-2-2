import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserProfile } from "./_lib/queries";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileAvatar } from "./_components/profile-avatar";
import { ProfileFormClient } from "./_components/profile-client-form";

export default async function ProfilePage() {
  // Get session
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/");
  }

  // Fetch user data
  const user = await getUserProfile(session.user.id);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <ProfileAvatar name={user.name} image={user.image} />
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileFormClient user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
