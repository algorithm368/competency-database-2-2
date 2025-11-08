import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSkillById } from "../_lib/skill";
import { HeaderSkill } from "../components/header-sfia-skill";
import { CardLevel } from "../components/card-level";

interface SkillPageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function SkillPageDetail({ params }: SkillPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const skill = await getSkillById(id);

  if (!skill) {
    notFound();
  }
  console.log(skill);

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/tpqi/sector" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to skill list
          </Link>
        </Button>

        <HeaderSkill
          name={skill.name}
          code={skill.code}
          category={skill.subCategory.category.name}
          subCategory={skill.subCategory.name}
        />

        <div className="mt-8 space-y-4">
          {skill.levels.map((lvl) => (
            <CardLevel
              key={lvl.id}
              level={{
                levelId: lvl.level.id,
                levelName: lvl.level.name,
                details: lvl.details.map((d) => ({
                  id: d.id,
                  content: d.content,
                })),
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
