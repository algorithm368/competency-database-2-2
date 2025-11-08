import Link from "next/link";
import { getSkills } from "./_lib/skill";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function SkillPage() {
  const skills = await getSkills();

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Skill List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
