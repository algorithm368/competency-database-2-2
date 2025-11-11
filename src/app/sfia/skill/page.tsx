import Link from "next/link";
import { getSkills } from "./_lib/skill";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function SkillPage() {
  const skills = await getSkills();

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <header className="mb-8 sm:mb-12 space-y-4 text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight">SFIA Skill List</h1>
          <p className="text-muted-foreground text-base">
            Browse all skills defined by the SFIA (Skills Framework for the
            Information Age)
          </p>
          <Separator className="mt-4" />
        </header>

        {/* Skill List */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {skills.map((skill) => (
            <Link
              key={skill.id}
              href={`/sfia/skill/${skill.id}`}
              className="group"
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="space-y-2">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary">
                    {skill.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{skill.code}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
