interface HeaderSkillProps {
  readonly name: string;
  readonly code: string;
  readonly category: string;
  readonly subCategory: string;
}

export function HeaderSkill({
  name,
  code,
  category,
  subCategory,
}: HeaderSkillProps) {
  return (
    <header className="mb-10">
      {/* Top section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {name}
        </h1>
        <span className="text-sm font-mono text-muted-foreground bg-muted/50 px-3 py-1 rounded-md">
          {code}
        </span>
      </div>

      {/* Category Info */}
      <div className="mt-3 space-y-1">
        <p className="text-base sm:text-lg text-muted-foreground">{category}</p>
        <p className="text-sm sm:text-base text-muted-foreground/80">
          {subCategory}
        </p>
      </div>

      {/* Description */}
      <div className="mt-6 border-t pt-4">
        <p className="text-base sm:text-lg text-muted-foreground">
          Details for SFIA competency
        </p>
      </div>
    </header>
  );
}
