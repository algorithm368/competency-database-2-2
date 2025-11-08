import { notFound } from "next/navigation";
import { getSkillById, getSkills } from "../_lib/skill";
import { HeaderSkill } from "../components/HeaderSkill";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SkillPageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function SkillPage({ params }: SkillPageProps) {
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
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/tpqi/sector" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to something
          </Link>
        </Button>
        <div>
          <HeaderSkill
            name={skill.name}
            code={skill.code}
            category={skill.subCategory.category.name}
            subCategory={skill.subCategory.name}
          />
        </div>
      </div>
    </main>
  );
}
